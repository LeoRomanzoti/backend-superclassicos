import { PrismaClient } from "@prisma/client";
import ChosenPlayersOnPointsRepository from "../../domain/repository/ChosenPlayersOnPointsRepository";
import ChosenPlayersOnPointsListDTO from "../../dto/in/ChosenPlayersOnPointsListDTO";

export default class ChosenPlayersOnPointsRepositoryDatabase implements ChosenPlayersOnPointsRepository {
    constructor(
        readonly databaseConnection: PrismaClient
    ) { }

    async save(pointId: string, chosenPlayerId: string): Promise<boolean> {
        try {
            const newPoint = await this.databaseConnection.chosenPlayersOnPoints.create({
                data: {
                    pointId: pointId,
                    chosenPlayerId: chosenPlayerId,
                }
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getByChosenPlayerId(chosenPlayerId: string): Promise<ChosenPlayersOnPointsListDTO[]> {
        const chosenPlayersOnPoints = await this.databaseConnection.chosenPlayersOnPoints.findMany({
            where: {
                chosenPlayerId: chosenPlayerId
            },
            select: {
                id: true,
                point: true
            }
        })
        return chosenPlayersOnPoints
    }
}