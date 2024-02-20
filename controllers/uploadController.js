import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from 'fs';

import logInformation from "../utils/logInformation.js";

const uploadFiles = async (req, res, next) => {
    try {
        logInformation("File uploaded by IP: ", req);
        res.redirect("/disk");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteFiles = async (req, res, next) => {
    try {
        logInformation("File deleted by IP: ", req);
        if (!req.body.filename) {
            res.status(400).send("Filename is required");
            return;
        }   
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const filePath = path.join(__dirname, '..', 'disk', req.body.filename);
        
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("An error occurred while deleting the file");
            } else {
                res.redirect("/disk");
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default {
    uploadFiles,
    deleteFiles,
};