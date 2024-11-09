const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs/promises");
const nodemailer = require("nodemailer");
const gm = require("gm").subClass({ imageMagick: true });
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

async function saveBase64Image(base64Data, outputPath) {
  try {
    const imageBuffer = Buffer.from(base64Data, "base64");
    const filePath = outputPath;
    await fs.writeFile(filePath, imageBuffer);
    return null;
  } catch (e) {
    return e;
  }
}

function prepareEmailBody(header, row, template) {
  let body = template;
  for (let i = 0; i < header.length; i++) {
    body = body.replace(`\$${header[i]}`, row[i]);
  }
  return body;
}

async function addQR(filePath, qr, url) {
  try {
    const image = await loadImage(filePath);
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      color: {
        light: "#ffffff55",
        dark: "#000000",
      },
    });
    const qrImage = await loadImage(qrCodeDataUrl);
    context.drawImage(
      qrImage,
      (qr.x * image.width) / 100,
      (qr.y * image.height) / 100,
      qr.size,
      qr.size,
    );
    await fs.writeFile(filePath, canvas.toBuffer());
  } catch (e) {
    return "Failed to draw qr image";
  }
}

async function addText(filePath, text, textWidth, xPercentage, yPercentage) {
  return new Promise((resolve, reject) => {
    gm(filePath).size(function (err, dimensions) {
      if (err) {
        reject("Failed to get image dimensions");
        return;
      }

      const { width, height } = dimensions;
      const x = (xPercentage / 100) * width;
      const y = (yPercentage / 100) * height;

      gm(filePath)
        .font(FONT_PATH, FONT_SIZE)
        .fill(FONT_COLOR)
        .drawText(x - textWidth / 2, y, text)
        .write(filePath, function (err) {
          if (err) {
            reject("Failed to write text on the image");
            return;
          }
          resolve();
        });
    });
  });
}

async function createCertificate(
  inFilePath,
  outFilePath,
  coords,
  row,
  header,
  qr,
  url,
) {
  try {
    await fs.copyFile(inFilePath, outFilePath);
  } catch (e) {
    return "Failed to copy file";
  }

  for (let i = 0; i < coords.length; i++) {
    const c = coords[i];
    const text = row[header.indexOf(c.field)];
    const xPercentage = c.x;
    const yPercentage = c.y;

    const textWidth = measureTextWidth(text, FONT_SIZE, FONT_PATH);
    if (!textWidth) return "Failed to get text width";
    const err = await addText(
      outFilePath,
      text,
      textWidth,
      xPercentage,
      yPercentage,
    );
    if (err) {
      return err;
    }
  }

  if (qr) {
    const err = await addQR(outFilePath, qr, url);
    if (err) {
      return err;
    }
  }
}

function sendEmail(
  emailSubject,
  emailBody,
  email,
  imagePath,
  extension,
  cb,
  err,
) {
  const mailOptions = {
    from: EMAIL_ID,
    to: "nishantholla19@gmail.com",
    subject: emailSubject,
    html: emailBody,
    attachments: [
      {
        filename: `certificate.${extension}`,
        path: imagePath,
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
  const baseFile = `./${project["_id"]}.${extension}`;

  let err = await saveBase64Image(project.image.buffer, baseFile);
  if (err) {
    return "Failed to save base file";
  }

  for (let i = 1; i < project.csv.length; i++) {
    const row = project.csv[i];
    const email = row[header.indexOf("email")];
    const name = row[header.indexOf("name")];

    if (!email || !name) {
      return "Failed to infer email and name";
    }

    if (row.length !== header.length) {
      return "Row length mismatch";
    }

    const emailSubject = project.emailSubject;
    const emailBody = prepareEmailBody(header, row, project.emailBody);
    const outFile = `./${email}.${extension}`;

    const certificate = await certificateCollection.insertOne({
      projectid: project["_id"],
      name: name,
      email: email,
      createdAt: Date.now(),
      status: "pending",
    });
    const certificateId = certificate.insertedId;

    err = await createCertificate(
      baseFile,
      outFile,
      project.coords,
      row,
      header,
      project.qr,
      `${VERIFICATION_URL}/${certificateId}`,
    );

    const updateStatus = async (status) => {
      await certificateCollection.updateOne(
        {
          _id: new ObjectId(certificateId),
        },
        { $set: { status } },
      );
    };

    if (err) {
      updateStatus("creationFailed");
    } else {
      sendEmail(
        emailSubject,
        emailBody,
        email,
        outFile,
        extension,
        () => {
          fs.unlink(outFile);
          updateStatus("success");
        },
        () => {
          updateStatus("emailFailed");
        },
      );
    }
  }
  await fs.unlink(baseFile);
}

module.exports = { send };
