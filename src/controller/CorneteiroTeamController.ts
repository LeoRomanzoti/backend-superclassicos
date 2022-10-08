import { PrismaClient } from "@prisma/client";
import CorneteiroTeamAdapter from "../adapter/CorneteiroTeamAdapter";
import CorneteiroTeam from "../domain/entity/CorneteiroTeam";
import CorneteiroTeamRepositoryDatabase from "../infra/database/CorneteiroTeamRepositoryDatabase";

export default class CorneteiroTeamController {
    constructor(readonly databaseConnection: PrismaClient) { }

    async getCorneteiroTeam(userId: string): Promise<CorneteiroTeam | undefined> {
        const corneteiroTeamAdapter = new CorneteiroTeamAdapter()
        const corneteiroTeamRepository = new CorneteiroTeamRepositoryDatabase(this.databaseConnection, corneteiroTeamAdapter)
        const corneteiroTeam = await corneteiroTeamRepository.getById(userId)
        return corneteiroTeam
    }

    async getAll() {
        const corneteiroTeamAdapter = new CorneteiroTeamAdapter()
        const corneteiroTeamRepository = new CorneteiroTeamRepositoryDatabase(this.databaseConnection, corneteiroTeamAdapter)
        const corneteiroTeams = await corneteiroTeamRepository.getAll()
        return corneteiroTeams
    }

}