import { PrismaClient } from "@prisma/client";
import ChosenPlayerAdapter from "../adapter/ChosenPlayerAdapter";
import Result from "../common/Result";
import ChosenPlayer from "../domain/entity/ChosenPlayer";
import AddPointToChosenPlayer from "../domain/usecase/AddPointToChosenPlayer";
import ChosenPlayersOnPointsListDTO from "../dto/in/ChosenPlayersOnPointsListDTO";
import ChosenPlayerRepositoryDatabase from "../infra/database/ChosenPlayerRepositoryDatabase";
import ChosenPlayersOnPointsRepositoryDatabase from "../infra/database/ChosenPlayersOnPointsRepositoryDatabase";
import PointRepositoryDatabase from "../infra/database/PointRepositoryDatabase";

export default class ChosenPlayersOnPointsController {

    constructor(readonly databaseConnection: PrismaClient) { }

    async addPoint(pointId: string, chosenPlayerId: string): Promise<Result<ChosenPlayer>> {
        const chosenPlayerAdapter = new ChosenPlayerAdapter()
        const chosenPlayerRepository = new ChosenPlayerRepositoryDatabase(this.databaseConnection, chosenPlayerAdapter)
        const pointRepository = new PointRepositoryDatabase(this.databaseConnection)
        const chosenPlayersOnPointsRepository = new ChosenPlayersOnPointsRepositoryDatabase(this.databaseConnection)
        const useCase = new AddPointToChosenPlayer(chosenPlayersOnPointsRepository, chosenPlayerRepository, pointRepository)
        const chosenPlayerWithUpdatedPoint = useCase.execute(pointId, chosenPlayerId)
        return chosenPlayerWithUpdatedPoint
    }

    async getAllByChosenPlayerId(chosenPlayerId: string): Promise<ChosenPlayersOnPointsListDTO[]> {
        const chosenPlayersOnPointsRepository = new ChosenPlayersOnPointsRepositoryDatabase(this.databaseConnection)
        const chosenPlayerPoints = await chosenPlayersOnPointsRepository.getByChosenPlayerId(chosenPlayerId)
        return chosenPlayerPoints
    }
}