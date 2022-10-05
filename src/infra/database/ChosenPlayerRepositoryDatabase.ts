import { PrismaClient } from "@prisma/client";
import ChosenPlayer from "../../domain/entity/ChosenPlayer";
import Player from "../../domain/entity/Player";
import Round from "../../domain/entity/Round";
import ChosenPlayerRepository from "../../domain/repository/ChosenPlayerRespository";

export default class ChosenPlayerRepositoryDatabase
    implements ChosenPlayerRepository
{
    constructor(readonly databaseConnection: PrismaClient) {}

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
        const player = new Player(
            chosenPlayerData?.player.id,
            chosenPlayerData?.player.name,
            chosenPlayerData?.player.position
        );
        const round = new Round(
            chosenPlayerData?.round.id,
            chosenPlayerData?.round.start_date,
            chosenPlayerData?.round.end_data,
            chosenPlayerData?.round.number
        );
        const chosenPlayer = new ChosenPlayer(
            chosenPlayerData?.id,
            player,
            round,
            chosenPlayerData?.score
        );
        return chosenPlayer;
    }

    getAll(): ChosenPlayer[] {
        throw new Error("Method not implemented.");
    }
}
