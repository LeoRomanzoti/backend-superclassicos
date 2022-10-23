import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import AuthController from "./controller/AuthController";
import ChosenPlayerController from "./controller/ChosenPlayerController";
import ChosenPlayersOnPointsController from "./controller/ChosenPlayersOnPointsController";
import CorneteiroTeamController from "./controller/CorneteiroTeamController";
import PointController from "./controller/PointController";
import UserController from "./controller/UserController";
import { verifyToken } from "./middleware/auth";

export default class Routes {
    databaseConnection: PrismaClient;

    constructor(readonly http: any) {
        this.databaseConnection = new PrismaClient();
        this.configure();
    }

    configure() {
        this.http.get("/", async (req: any, res: any) => {
            res.json({ message: "I'm alive" });
        });

        this.http.post("/users", verifyToken, async (req: any, res: any) => {
            const userController = new UserController(this.databaseConnection);
            const newUser = await userController.createUser(
                req?.body?.name,
                req?.body?.phone
            );
            if (!newUser)
                return res.status(404).json({ message: "User already exist" });
            res.json(newUser);
        });

        this.http.get("/users", verifyToken, async (req: any, res: any) => {
            const userController = new UserController(this.databaseConnection);
            const users = await userController.getUsers();
            res.json(users);
        });

        this.http.get(
            "/users/:userId",
            verifyToken,
            async (req: any, res: any) => {
                const userController = new UserController(
                    this.databaseConnection
                );
                const users = await userController.getUserById(
                    req?.params?.userId
                );
                if (!users)
                    return res.status(404).json({ message: "Not found" });
                res.json(users);
            }
        );

        this.http.get(
            "/users/:userId/teams",
            verifyToken,
            async (req: any, res: any) => {
                const corneteiroTeamController = new CorneteiroTeamController(
                    this.databaseConnection
                );
                const corneteiroTeam =
                    await corneteiroTeamController.getCorneteiroTeam(
                        req?.params?.userId
                    );
                if (!corneteiroTeam)
                    return res.status(404).json({ message: "Not found" });
                res.json(corneteiroTeam);
            }
        );

        this.http.post(
            "/users/:userId/teams",
            verifyToken,
            async (req: any, res: any) => {
                const corneteiroTeamController = new CorneteiroTeamController(
                    this.databaseConnection
                );
                const corneteiroTeam =
                    await corneteiroTeamController.createCorneteiroTeam(
                        req?.body?.team_name,
                        req?.params?.userId
                    );
                if (!corneteiroTeam)
                    return res
                        .status(404)
                        .json({ message: "Team already exist" });
                res.json(corneteiroTeam);
            }
        );

        this.http.delete(
            "/users/:userId/teams/:teamId/players/:teamsOnPlayersId",
            verifyToken,
            async (req: any, res: any) => {
                const corneteiroTeamController = new CorneteiroTeamController(
                    this.databaseConnection
                );
                const itWasRemovedOrError =
                    await corneteiroTeamController.removePlayer(
                        req?.params?.teamsOnPlayersId
                    );
                if (itWasRemovedOrError.isFailure)
                    return res
                        .status(403)
                        .json({ message: itWasRemovedOrError.error });
                res.json({});
            }
        );

        this.http.post(
            "/users/:userId/teams/:teamId/players",
            verifyToken,
            async (req: any, res: any) => {
                const corneteiroTeamController = new CorneteiroTeamController(
                    this.databaseConnection
                );
                try {
                    const addPlayerOrError =
                        await corneteiroTeamController.addChosenPlayer(
                            req?.body?.chosen_player_id,
                            req?.params?.teamId,
                            req?.params?.userId,
                            new Date()
                        );

                    if (addPlayerOrError.isFailure)
                        return res
                            .status(404)
                            .json({ message: addPlayerOrError.error });
                    res.json({});
                } catch (error) {
                    return res.status(401).json({ message: error });
                }
            }
        );

        this.http.get("/teams", verifyToken, async (req: any, res: any) => {
            const corneteiroTeamController = new CorneteiroTeamController(
                this.databaseConnection
            );
            const corneteiroTeams = await corneteiroTeamController.getAll();
            res.json(corneteiroTeams);
        });

        this.http.get("/ranking", verifyToken, async (req: any, res: any) => {
            const corneteiroTeamController = new CorneteiroTeamController(
                this.databaseConnection
            );
            const corneteiroTeams = await corneteiroTeamController.getRanking();
            res.json(corneteiroTeams);
        });

        this.http.get("/points", async (req: any, res: any) => {
            const pointController = new PointController(
                this.databaseConnection
            );
            const points = await pointController.list();
            res.json(points);
        });

        this.http.get(
            "/chosen-players",
            verifyToken,
            async (req: any, res: any) => {
                const chosenPlayerController = new ChosenPlayerController(
                    this.databaseConnection
                );
                const points = await chosenPlayerController.getChosenPlayers();
                res.json(points);
            }
        );

        this.http.post(
            "/chosen-players/:chosenPlayerId/points",
            async (req: any, res: any) => {
                const chosenPlayersOnPointsController =
                    new ChosenPlayersOnPointsController(
                        this.databaseConnection
                    );
                const chosenPlayerWithUpdatedIdOrError =
                    await chosenPlayersOnPointsController.addPoint(
                        req?.body?.point_id,
                        req?.params?.chosenPlayerId
                    );

                if (chosenPlayerWithUpdatedIdOrError.isFailure)
                    return res.status(400).json({
                        message: chosenPlayerWithUpdatedIdOrError.error,
                    });

                res.json(chosenPlayerWithUpdatedIdOrError.getValue());
            }
        );

        this.http.get(
            "/chosen-players/:chosenPlayerId/points",
            verifyToken,
            async (req: any, res: any) => {
                const chosenPlayersOnPointsController =
                    new ChosenPlayersOnPointsController(
                        this.databaseConnection
                    );
                const chosenPlayerPoints =
                    await chosenPlayersOnPointsController.getAllByChosenPlayerId(
                        req?.params?.chosenPlayerId
                    );

                res.json(chosenPlayerPoints);
            }
        );

        this.http.post("/login", async (req: Request, res: Response) => {
            try {
                const authController = new AuthController(
                    this.databaseConnection
                );
                const user = await authController.login(req?.body?.user_phone);
                res.json(user);
            } catch (error: any) {
                res.status(401).json({
                    message: "Não foi possível fazer o login.",
                });
            }
        });

        this.http.post("/validation", async (req: Request, res: Response) => {
            try {
                const authController = new AuthController(
                    this.databaseConnection
                );
                const isValidOrError = await authController.validate(
                    req?.body?.user_id,
                    req?.body?.code
                );
                if (isValidOrError.isFailure)
                    return res
                        .status(401)
                        .json({ message: "Não foi possível fazer o login." });
                const user = isValidOrError.getValue();

                const token = jwt.sign({ user }, "supersecrety", {
                    expiresIn: 604800, // expires in 7 days
                });

                return res.json({ user, token });
            } catch (error: any) {
                res.status(error?.response?.status).json(error?.response?.data);
            }
        });
    }
}
