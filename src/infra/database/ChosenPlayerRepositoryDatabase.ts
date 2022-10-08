import { PrismaClient } from "@prisma/client";
import ChosenPlayerAdapter from "../../adapter/ChosenPlayerAdapter";
import ChosenPlayer from "../../domain/entity/ChosenPlayer";
import ChosenPlayerRepository from "../../domain/repository/ChosenPlayerRespository";

export default class ChosenPlayerRepositoryDatabase
    implements ChosenPlayerRepository {
    constructor(readonly databaseConnection: PrismaClient, readonly chosenPlayerAdapter: ChosenPlayerAdapter) { }

    async getById(chosenPlayerId: string): Promise<ChosenPlayer | undefined> {
        const chosenPlayerData =
            await this.databaseConnection.chosenPlayer.findUnique({
                where: {
                    id: chosenPlayerId,
                },
                include: {
                    player: true,
                    round: true,
                },
            });
        if (!chosenPlayerData) return;
        const chosenPlayer = this.chosenPlayerAdapter.parse(chosenPlayerData)
        return chosenPlayer;
    }

    async getAll(): Promise<ChosenPlayer[] | undefined> {
        let chosenPlayerList = []
        const chosenPlayersData = await this.databaseConnection.chosenPlayer.findMany({
            include: {
                player: {
                    select: {
                        name: true,
                        position: true
                    }
                },
            }
        })
        for (const chosenPlayerData of chosenPlayersData) {
            const chosenPlayer = this.chosenPlayerAdapter.parse(chosenPlayerData)
            chosenPlayerList.push(chosenPlayer)
        }
        return chosenPlayerList
    }
}
