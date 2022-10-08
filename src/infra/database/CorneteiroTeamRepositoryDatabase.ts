import { PrismaClient } from "@prisma/client";
import CorneteiroTeamAdapter from "../../adapter/CorneteiroTeamAdapter";
import CorneteiroTeam from "../../domain/entity/CorneteiroTeam";
import CorneteiroTeamRepository from "../../domain/repository/CorneteiroTeamRepository";

export default class CorneteiroTeamRepositoryDatabase implements CorneteiroTeamRepository {
    constructor(readonly databaseConnection: PrismaClient, readonly corneteiroTeamAdapter: CorneteiroTeamAdapter) { }

    async getAll(): Promise<CorneteiroTeam[] | undefined> {
        let corneteiroTeams = []
        const corneteiroTeamsData = await this.databaseConnection.team.findMany({
            select: {
                id: true,
                name: true,
                teamsOnPlayers: true,
            }
        })
        for (const ct of corneteiroTeamsData) {
            const corneteiroTeam = this.corneteiroTeamAdapter.parse(ct.name, ct.id, ct.teamsOnPlayers)
            corneteiroTeams.push(corneteiroTeam)
        }
        return corneteiroTeams;
    }

    async getById(userId: string): Promise<CorneteiroTeam | undefined> {
        const corneteiroTeamData = await this.databaseConnection.team.findUnique({
            where: {
                userId: userId
            },
            select: {
                id: true,
                name: true,
                teamsOnPlayers: {
                    select: {
                        chosenPlayer: {
                            select: {
                                score: true,
                                player: true
                            }
                        }
                    }
                },
            }
        })
        if (!corneteiroTeamData) return
        const corneteiroTeam = this.corneteiroTeamAdapter.parse(corneteiroTeamData.name, corneteiroTeamData.id, corneteiroTeamData.teamsOnPlayers)
        return corneteiroTeam
    }

}