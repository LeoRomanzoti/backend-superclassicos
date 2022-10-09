import { PrismaClient } from "@prisma/client";

import CorneteiroTeamAdapter from "../../adapter/CorneteiroTeamAdapter";
import CorneteiroTeam from "../../domain/entity/CorneteiroTeam";
import CorneteiroTeamRepository from "../../domain/repository/CorneteiroTeamRepository";

export default class CorneteiroTeamRepositoryDatabase
    implements CorneteiroTeamRepository
{
    constructor(
        readonly databaseConnection: PrismaClient,
        readonly corneteiroTeamAdapter: CorneteiroTeamAdapter
    ) {}

    async removePlayer(teamsOnPlayersId: string): Promise<boolean> {
        try {
            const removePlayer =
                await this.databaseConnection.teamsOnPlayers.delete({
                    where: {
                        id: teamsOnPlayersId,
                    },
                });
            return !!removePlayer.id;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async save(
        teamName: string,
        userId: string
    ): Promise<CorneteiroTeam | undefined> {
        try {
            const corneteiroTeamData =
                await this.databaseConnection.team.create({
                    data: {
                        userId,
                        name: teamName,
                    },
                });
            const corneteiroTeam = this.corneteiroTeamAdapter.parse(
                corneteiroTeamData.name,
                corneteiroTeamData.id,
                []
            );
            return corneteiroTeam;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(): Promise<CorneteiroTeam[] | undefined> {
        const corneteiroTeams = [];
        const corneteiroTeamsData = await this.databaseConnection.team.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    teamsOnPlayers: true,
                },
            }
        );
        for (const ct of corneteiroTeamsData) {
            const corneteiroTeam = this.corneteiroTeamAdapter.parse(
                ct.name,
                ct.id,
                ct.teamsOnPlayers
            );
            corneteiroTeams.push(corneteiroTeam);
        }
        return corneteiroTeams;
    }

    async getById(userId: string): Promise<CorneteiroTeam | undefined> {
        const corneteiroTeamData =
            await this.databaseConnection.team.findUnique({
                where: {
                    userId,
                },
                select: {
                    id: true,
                    name: true,
                    teamsOnPlayers: {
                        select: {
                            id: true,
                            chosenPlayer: {
                                select: {
                                    score: true,
                                    player: true,
                                },
                            },
                        },
                    },
                },
            });
        if (!corneteiroTeamData) return;
        const corneteiroTeam = this.corneteiroTeamAdapter.parse(
            corneteiroTeamData.name,
            corneteiroTeamData.id,
            corneteiroTeamData.teamsOnPlayers
        );
        return corneteiroTeam;
    }
}
