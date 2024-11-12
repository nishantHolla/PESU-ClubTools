const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");
const { createCanvas, loadImage } = require("canvas");
const QRCode = require("qrcode");

const FONT_SIZE = 60;
const FONT_PATH = "./font.otf";
const FONT_COLOR = "black";
const PASSWORD = process.env.CLUBTOOLS_GMAIL_APP_PASSWORD;
const EMAIL_ID = process.env.CLUBTOOLS_GMAIL_ID;
const VERIFICATION_URL = "https://pesu-club-tools.vercel.app/verify";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_ID,
    pass: PASSWORD,
  },
});

function measureTextWidth(text, fontSize, fontFamily) {
  try {
    const canvas = createCanvas(1000, 200);
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px ${fontFamily}`;
    const measurement = context.measureText(text);
    return measurement.width;
  } catch (e) {
    return null;
  }
}

function prepareEmailBody(header, row, template) {
  let body = template;
  for (let i = 0; i < header.length; i++) {
    body = body.replace(`\$${header[i]}`, row[i]);
  }
  return body;
}

async function createCertificate(
  base64ImageData,
  coords,
  row,
  header,
  qr,
  url,
) {
  try {
    const imageBuffer = Buffer.from(base64ImageData.buffer, "base64");
    const image = await loadImage(imageBuffer);
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    for (let i = 0; i < coords.length; i++) {
      const c = coords[i];
      const text = row[header.indexOf(c.field)];
      const xPercentage = c.x;
      const yPercentage = c.y;
      const textWidth = measureTextWidth(text, FONT_SIZE, FONT_PATH);
      if (!textWidth) throw new Error("Failed to get text width");

      const x = (xPercentage / 100) * image.width;
      const y = (yPercentage / 100) * image.height;
      context.font = `${FONT_SIZE}px ${FONT_PATH}`;
      context.fillStyle = FONT_COLOR;
      context.fillText(text, x - textWidth / 2, y);
    }

    if (qr) {
      const qrCodeDataUrl = await QRCode.toDataURL(url, {
        color: {
          light: "#ffffff55",
          dark: "#000000",
        },
      });
      const qrImage = await loadImage(qrCodeDataUrl);
      const qrSize = qr.size;
      context.drawImage(
        qrImage,
        (qr.x * image.width) / 100,
        (qr.y * image.height) / 100,
        qrSize,
        qrSize,
      );
    }

    return canvas.toBuffer();
  } catch (e) {
    throw new Error("Certificate creation failed: " + e.message);
  }
}

function sendEmail(
  emailSubject,
  emailBody,
  email,
  imageBuffer,
  extension,
  cb,
  err,
) {
  const mailOptions = {
    from: EMAIL_ID,
    to: email,
    subject: emailSubject,
    html: emailBody,
    attachments: [
      {
        filename: `certificate.${extension}`,
        content: imageBuffer,
        encoding: "base64",
      },
    ],
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      cb();
    })
    .catch((_) => {
      err();
    });
}

async function send(project, certificateCollection) {
  if (!project) {
    return "Failed to find project";
  }

  const header = project.csv[0];
  const extension = project.contentType.split("/")[1];

  for (let i = 1; i < project.csv.length; i++) {
    const row = project.csv[i];
    const email = row[header.indexOf("email")];
    const name = row[header.indexOf("name")];

    const certificateCheck = await certificateCollection.findOne({
      email,
      projectid: project["_id"],
    });

    if (certificateCheck) {
      continue;
    }

    if (!email || !name) {
      return "Failed to infer email and name";
    }

    if (row.length !== header.length) {
      return "Row length mismatch";
    }

    const emailSubject = project.emailSubject;
    const emailBody = prepareEmailBody(header, row, project.emailBody);

    const certificate = await certificateCollection.insertOne({
      projectid: project["_id"],
      name: name,
      email: email,
      createdAt: Date.now(),
      status: "pending",
    });
    const certificateId = certificate.insertedId;

    const updateStatus = async (status) => {
      await certificateCollection.updateOne(
        {
          _id: new ObjectId(certificateId),
        },
        { $set: { status } },
      );
    };

    try {
      const imageBuffer = await createCertificate(
        project.image,
        project.coords,
        row,
        header,
        project.qr,
        `${VERIFICATION_URL}/${certificateId}`,
      );

      sendEmail(
        emailSubject,
        emailBody,
        email,
        imageBuffer,
        extension,
        () => {
          updateStatus("success");
        },
        () => {
          updateStatus("emailFailed");
        },
      );
    } catch (e) {
      updateStatus("creationFailed");
    }
  }
}

module.exports = { send };
