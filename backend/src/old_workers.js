const dotenv = require("dotenv");
dotenv.config();

const { createCanvas, loadImage } = require("canvas");
const gm = require("gm").subClass({ imageMagick: true });
const fs = require("fs");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

const FONT_SIZE = 60;
const FONT_COLOR = "black";
const FONT_PATH = "./font.otf";
const PASSWORD = process.env.CLUBTOOLS_GMAIL_APP_PASSWORD;
const EMAIL_ID = process.env.CLUBTOOLS_GMAIL_ID;
const VERIFICATION_URL = "http://localhost:5173/verify";

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

let canvas;
let canvasContext;

async function initCanvas(inputPath) {
  const image = await loadImage(inputPath);
  canvas = createCanvas(image.width, image.height);
  canvasContext = canvas.getContext("2d");

  canvasContext.drawImage(image, 0, 0);
  return { width: image.width, height: image.height };
}

function saveBase64Image(base64Data, outputPath) {
  const imageBuffer = Buffer.from(base64Data, "base64");
  const filePath = outputPath;
  fs.writeFileSync(filePath, imageBuffer);
}

function measureTextWidth(text, fontSize, fontFamily) {
  const canvas = createCanvas(1000, 200);
  const context = canvas.getContext("2d");
  context.font = `${fontSize}px ${fontFamily}`;
  const textMetrics = context.measureText(text);
  return textMetrics.width;
}

async function addQR(inputImage, qr, url, outputImage) {
  console.log(inputImage)
  const image = await initCanvas(inputImage);
  const qrCodeDataUrl = await QRCode.toDataURL(url, {
    color: {
      light: "#ffffff55",
      dark: "#000000",
    },
  });
  const qrImage = await loadImage(qrCodeDataUrl);
  canvasContext.drawImage(
    qrImage,
    (qr.x * image.width) / 100,
    (qr.y * image.height) / 100,
    qr.size,
    qr.size,
  );
  fs.writeFileSync(outputImage, canvas.toBuffer());
}

function addText(inputImage, textWidth, xPercent, yPercent, text, outputImage) {
  return new Promise((resolve, reject) => {
    gm(inputImage).size(function (err, dimensions) {
      if (err) {
        reject(err);
        return;
      }

      const { width, height } = dimensions;
      const x = (xPercent / 100) * width;
      const y = (yPercent / 100) * height;

      gm(inputImage)
        .font(FONT_PATH, FONT_SIZE)
        .fill(FONT_COLOR)
        .drawText(x - textWidth / 2, y, text)
        .write(outputImage, function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
    });
  });
}

async function createCertificate(baseFile, out, coords, row, header, qr, url) {
  fs.copyFileSync(baseFile, out);
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    const text = row[header.indexOf(coord.field)];
    const x = coord.x;
    const y = coord.y;

    const textWidth = measureTextWidth(text, FONT_SIZE, FONT_PATH);
    await addText(out, textWidth, x, y, text, out);
  }

  if (qr) {
    await addQR(out, qr, url, out);
  }
}

function prepareEmailBody(header, row, body) {
  let b = body;

  for (let i = 0; i < header.length; i++) {
    const text = row[i];
    b = b.replace(`\$${header[i]}`, text);
  }

  return b;
}

function sendEmail(subject, body, to, imagePath, extension) {
  const mailOptions = {
    from: EMAIL_ID,
    to: "nishantholla19@gmail.com",
    subject: subject,
    html: body,
    attachments: [
      {
        filename: `certificate.${extension}`,
        path: imagePath,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email: ", error);
    }
  });
}

async function send(project, certificateCollection) {
  const header = project.csv[0];
  const extension = project.contentType.split("/")[1];
  const baseFile = `./${project["_id"]}.${extension}`;

  saveBase64Image(project.image.buffer, baseFile);
  for (let i = 1; i < project.csv.length; i++) {
    const row = project.csv[i];
    const email = row[header.indexOf("email")];
    const name = row[header.indexOf("name")];
    const emailBody = prepareEmailBody(header, row, project.emailBody);
    const file = `./${email}.${extension}`;

    const certificate = await certificateCollection.insertOne({
      projectid: project["_id"],
      name: name,
      email: email,
      createdAt: Date.now(),
    });

    createCertificate(
      baseFile,
      file,
      project.coords,
      row,
      header,
      project.qr,
      `${VERIFICATION_URL}/${certificate.insertedId}`,
    );
    // sendEmail(project.emailSubject, emailBody, email, file, extension);
    // fs.unlinkSync(`./${email}.${extension}`)
  }
}

module.exports = { send };
