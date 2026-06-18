const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = process.env.PORT || 3000;
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function send(response, status, body, type = "application/json; charset=utf-8") {
  response.writeHead(status, { "Content-Type": type });
  response.end(body);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request too large"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function notifyByEmail(message) {
  if (!process.env.SMTP_HOST) return false;

  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });

  await transporter.sendMail({
    from: process.env.CONTACT_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO || process.env.SMTP_USER,
    replyTo: message.email,
    subject: `Portfolio contact: ${message.subject}`,
    text: `Name: ${message.name}\nEmail: ${message.email}\n\n${message.message}`,
  });
  return true;
}

async function handleContact(request, response) {
  try {
    const payload = JSON.parse(await readBody(request));
    const required = ["name", "email", "subject", "message"];

    if (required.some((field) => !String(payload[field] || "").trim())) {
      send(response, 400, JSON.stringify({ error: "Missing required fields" }));
      return;
    }

    const message = {
      name: String(payload.name).trim(),
      email: String(payload.email).trim(),
      subject: String(payload.subject).trim(),
      message: String(payload.message).trim(),
      createdAt: new Date().toISOString(),
    };

    const dataDir = path.join(root, "data");
    fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(path.join(dataDir, "messages.jsonl"), `${JSON.stringify(message)}\n`);

    const emailed = await notifyByEmail(message);
    send(response, 200, JSON.stringify({ ok: true, emailed }));
  } catch (error) {
    send(response, 500, JSON.stringify({ error: "Unable to process message" }));
  }
}

function serveStatic(request, response) {
  const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const filePath = path.normalize(path.join(root, requestPath === "/" ? "index.html" : requestPath));

  if (!filePath.startsWith(root)) {
    send(response, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(response, 404, "Not found", "text/plain; charset=utf-8");
      return;
    }

    send(response, 200, data, contentTypes[path.extname(filePath)] || "application/octet-stream");
  });
}

const server = http.createServer((request, response) => {
  if (request.method === "POST" && request.url === "/api/contact") {
    handleContact(request, response);
    return;
  }

  if (request.method === "GET") {
    serveStatic(request, response);
    return;
  }

  send(response, 405, "Method not allowed", "text/plain; charset=utf-8");
});

server.listen(port, () => {
  console.log(`Portfolio running at http://localhost:${port}`);
});
