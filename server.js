import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { uploadRoute } from "./routes/index.js";
import { corsOptions, config } from "./config/index.js";
import upload from "./storage/storage.js";
import credentials from "./middleware/credentials.js";
import logInformation from "./utils/logInformation.js";

const app = express();

app.set(
    "views",
    path.join(path.dirname(fileURLToPath(import.meta.url)), "views")
);
app.set("view engine", "ejs");

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // for POST and PUT requests (sending data in the form of some data object)

// Using public folder for static files
const __dirname = dirname(fileURLToPath(import.meta.url));
// Check and create 'disk' directory if it doesn't exist
const diskDir = path.join(__dirname, "disk");
if (!fs.existsSync(diskDir)){
    fs.mkdirSync(diskDir);
}

app.use("/public/", express.static(path.join(__dirname, "public")));
app.use("/disk/", express.static(path.join(__dirname, "disk")));

app.use("/api", upload.single("myFile"), uploadRoute);

app.get("/disk", (req, res) => {
    fs.readdir(path.join(__dirname, "disk"), (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send(
                "An error occurred while reading the disk directory"
            );
        } else {
            // logInformation("Accessing files page: ", req);
            res.render("disk.ejs", { files: files });
        }
    });
});

app.use("/", (req, res) => {
  // logInformation("Accessing index page: ", req);
  res.render("index.ejs");
});

app.listen(config.server_port, async () => {
    console.log("Server is listening on PORT " + config.server_port);
});
