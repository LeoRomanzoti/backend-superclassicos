import { PrismaClient } from "@prisma/client";
import ChosenPlayerAdapter from "../adapter/ChosenPlayerAdapter";
import ChosenPlayer from "../domain/entity/ChosenPlayer";
import ChosenPlayerRepositoryDatabase from "../infra/database/ChosenPlayerRepositoryDatabase";

export default class ChosenPlayerController {
    constructor(readonly databaseConnection: PrismaClient) { }

    async getChosenPlayers(): Promise<ChosenPlayer[] | undefined> {
        const chosenPlayerAdapter = new ChosenPlayerAdapter()
        const chosenPlayerRepository = new ChosenPlayerRepositoryDatabase(this.databaseConnection, chosenPlayerAdapter)
        const chosenPlayers = await chosenPlayerRepository.getAll()
        return chosenPlayers
    }

}