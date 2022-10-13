import { PrismaClient } from "@prisma/client";

import TeamsOnPlayersAdapter from "../../adapter/TeamsOnPlayersAdapter";
import TeamsOnPlayers from "../../domain/entity/TeamsOnPlayers";
import TeamsOnPlayersRepository from "../../domain/repository/TeamsOnPlayersRepository";

export default class TeamsOnPlayersRepositoryDatabase
    implements TeamsOnPlayersRepository
{
    constructor(
        readonly teamsOnPlayersDatabase: PrismaClient,
        readonly teamsOnPlayersAdapter: TeamsOnPlayersAdapter
    ) {}

    async save(chosenPlayerId: string, teamId: string): Promise<boolean> {
        try {
            await this.teamsOnPlayersDatabase.teamsOnPlayers.create({
                data: {
                    chosenPlayerId,
                    teamId,
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async remove(teamsOnPlayersId: string): Promise<boolean> {
        try {
            await this.teamsOnPlayersDatabase.teamsOnPlayers.delete({
                where: {
                    id: teamsOnPlayersId,
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getBydId(
        teamsOnPlayersId: string
    ): Promise<TeamsOnPlayers | undefined> {
        const teamsOnPlayersData =
            await this.teamsOnPlayersDatabase.teamsOnPlayers.findUnique({
                where: {
                    id: "fc36b37d-78de-482e-87be-13433dd8b057",
                },
                select: {
                    id: true,
                    teamId: true,
                    chosenPlayer: {
                        select: {
                            id: true,
                            score: true,
                            player: true,
                            round: true,
                        },
                    },
                },
            });
        if (!teamsOnPlayersData) return;
        const teamsOnPlayers = this.teamsOnPlayersAdapter.parse(
            teamsOnPlayersId,
            teamsOnPlayersData.chosenPlayer.id,
            teamsOnPlayersData.teamId,
            teamsOnPlayersData.chosenPlayer.player.id,
            teamsOnPlayersData.chosenPlayer.player.name,
            teamsOnPlayersData.chosenPlayer.player.position,
            teamsOnPlayersData.chosenPlayer.round.id,
            teamsOnPlayersData.chosenPlayer.round.start_date,
            teamsOnPlayersData.chosenPlayer.round.end_date,
            teamsOnPlayersData.chosenPlayer.round.number,
            teamsOnPlayersData?.chosenPlayer.score
        );
        return teamsOnPlayers;
    }
}
