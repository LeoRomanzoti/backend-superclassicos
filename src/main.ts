import cors from "cors";
import express from "express";
import Routes from "./Routes";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

new Routes(app);

app.post("/", (req, res) => {
    res.json({ message: "hello world!" });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
