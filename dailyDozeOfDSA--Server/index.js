import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import db from "./config/mongoose.js";
import passportSetup from "./config/passport.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mainRouter from "./routes/index.js";
import fs from "fs";
import mime from "mime";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

console.log("***which environment:***", app.get("env"));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, "dist")));
app.use((request, response, next) => {
  if (request.path.endsWith(".wasm")) {
    response.setHeader("Content-Type", "application/wasm");
    response.type("application/wasm");
  }
  next();
});

const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
});

(function _loadModels(modelsDir) {
  fs.readdirSync(modelsDir).forEach((currDir) => {
    let currDirPath = path.join(modelsDir, currDir);
    if (fs.statSync(currDirPath).isDirectory()) {
      _loadModels(currDirPath);
    } else if (path.extname(currDir) === ".js") {
      import(pathToFileURL(currDirPath).href);
    }
  });
})(path.join(__dirname, "models"));

const sess = {
  name: "yello-session",
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: store,
};

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", mainRouter);

app.use((request, response, next) => {
  const requestPath = request.path;
  if (/(^(\/pspdfkit-lib))/i.test(requestPath)) {
    response.sendFile(path.join(__dirname, "dist", "pspdfkit-lib"));
  } else if (/(.ico|.js|.css|.jpg|.jpeg|.png|.webp)$/i.test(requestPath)) {
    next();
  } else if (!/(^(\/api))/i.test(requestPath)) {
    response.header(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate"
    );
    response.header("Expires", "-1");
    response.header("Pragma", "no-cache");
    response.sendFile(path.join(__dirname, "dist", "index.html"));
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});
