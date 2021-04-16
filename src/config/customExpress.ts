import express from "express";
import consign from "consign";
import bodyParser from "body-parser";

export default function customExpress() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    consign({ extensions: ['.js'] })
        .include("dist\\src\\controllers")
        .into(app);
    return app;
};