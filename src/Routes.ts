import { PrismaClient } from "@prisma/client";

import ChosenPlayerController from "./controller/ChosenPlayerController";
import CorneteiroTeamController from "./controller/CorneteiroTeamController";
import PointController from "./controller/PointController";
import UserController from "./controller/UserController";

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

        this.http.post("/users", async (req: any, res: any) => {
            const userController = new UserController(this.databaseConnection);
            const newUser = await userController.createUser(
                req?.body?.name,
                req?.body?.phone
            );
            if (!newUser)
                return res.status(404).json({ message: "User already exist" });
            res.json(newUser);
        });

        this.http.get("/users", async (req: any, res: any) => {
            const userController = new UserController(this.databaseConnection);
            const users = await userController.getUsers();
            res.json(users);
        });

        this.http.get("/users/:userId", async (req: any, res: any) => {
            const userController = new UserController(this.databaseConnection);
            const users = await userController.getUserById(req?.params?.userId);
            if (!users) return res.status(404).json({ message: "Not found" });
            res.json(users);
        });

        this.http.get("/users/:userId/teams", async (req: any, res: any) => {
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
        });

        this.http.post("/users/:userId/teams", async (req: any, res: any) => {
            const corneteiroTeamController = new CorneteiroTeamController(
                this.databaseConnection
            );
            const corneteiroTeam =
                await corneteiroTeamController.createCorneteiroTeam(
                    req?.body?.team_name,
                    req?.params?.userId
                );
            if (!corneteiroTeam)
                return res.status(404).json({ message: "Team already exist" });
            res.json(corneteiroTeam);
        });

        this.http.delete(
            "/users/:userId/teams/:teamId/players/:teamsOnPlayersId",
            async (req: any, res: any) => {
                const corneteiroTeamController = new CorneteiroTeamController(
                    this.databaseConnection
                );
                const itWasRemoved =
                    await corneteiroTeamController.removePlayer(
                        req?.params?.teamsOnPlayersId
                    );
                if (!itWasRemoved)
                    return res.status(404).json({ message: "Error" });
                res.json({});
            }
        );

        this.http.post(
            "/users/:userId/teams/:teamId/players",
            async (req: any, res: any) => {
                const corneteiroTeamController = new CorneteiroTeamController(
                    this.databaseConnection
                );
                const isWasAdd = await corneteiroTeamController.addChoenPlayer(
                    req?.body?.chosen_player_id,
                    req?.params?.teamId
                );
                if (!isWasAdd)
                    return res.status(404).json({ message: "Error" });
                res.json({});
            }
        );

        this.http.get("/teams", async (req: any, res: any) => {
            const corneteiroTeamController = new CorneteiroTeamController(
                this.databaseConnection
            );
            const corneteiroTeams = await corneteiroTeamController.getAll();
            res.json(corneteiroTeams);
        });

        this.http.get("/points", async (req: any, res: any) => {
            const pointController = new PointController(
                this.databaseConnection
            );
            const points = await pointController.list();
            res.json(points);
        });

        this.http.get("/chosen-players", async (req: any, res: any) => {
            const chosenPlayerController = new ChosenPlayerController(
                this.databaseConnection
            );
            const points = await chosenPlayerController.getChosenPlayers();
            res.json(points);
        });
    }
}
