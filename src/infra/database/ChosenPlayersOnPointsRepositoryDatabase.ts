import { PrismaClient } from "@prisma/client";

import ChosenPlayersOnPointsRepository from "../../domain/repository/ChosenPlayersOnPointsRepository";
import ChosenPlayersOnPointsListDTO from "../../dto/in/ChosenPlayersOnPointsListDTO";

export default class ChosenPlayersOnPointsRepositoryDatabase
    implements ChosenPlayersOnPointsRepository
{
    constructor(readonly databaseConnection: PrismaClient) {}

    async save(pointId: string, chosenPlayerId: string): Promise<boolean> {
        try {
            await this.databaseConnection.chosenPlayersOnPoints.create({
                data: {
                    pointId,
                    chosenPlayerId,
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getByChosenPlayerId(
        chosenPlayerId: string
    ): Promise<ChosenPlayersOnPointsListDTO[]> {
        const chosenPlayersOnPoints =
            await this.databaseConnection.chosenPlayersOnPoints.findMany({
                where: {
                    chosenPlayerId,
                },
                select: {
                    id: true,
                    point: true,
                },
            });
        return chosenPlayersOnPoints;
    }
}
