import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

import Routes from "./Routes";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

new Routes(app);

app.listen(port, () => {
    console.log(
        `⚡️⚡️⚡️⚡️⚡️ [server]: Server is running at https://localhost:${port}`
    );
});
