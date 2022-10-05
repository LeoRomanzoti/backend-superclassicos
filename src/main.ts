import express from "express";
import main from "./../src/infra/database/prisma";

const app = express();

app.get("/teams/", (req: any, res: any) => {});

app.listen(3000);
