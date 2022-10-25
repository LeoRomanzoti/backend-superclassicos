import { PrismaClient } from "@prisma/client";

import ChosenPlayerAdapter from "../adapter/ChosenPlayerAdapter";
import CorneteiroTeamAdapter from "../adapter/CorneteiroTeamAdapter";
import RoundAdapter from "../adapter/RoundAdapter";
import TeamsOnPlayersAdapter from "../adapter/TeamsOnPlayersAdapter";
import Result from "../common/Result";
import CorneteiroTeam from "../domain/entity/CorneteiroTeam";
import AddChosenPlayer from "../domain/usecase/AddChosenPlayer";
import CorneteiroTeamDetail from "../domain/usecase/CorneteiroTeamDetail";
import CorneteiroTeamRanking from "../domain/usecase/CorneteiroTeamRanking";
import CreateCorneteiroTeam from "../domain/usecase/CreateCorneteiroTeam";
import RemoveChosenPlayer from "../domain/usecase/RemoveChosenPlayer";
import CorneteiroTeamShort from "../dto/out/CorneteiroTeamShort";
import ChosenPlayerRepositoryDatabase from "../infra/database/ChosenPlayerRepositoryDatabase";
import CorneteiroTeamRepositoryDatabase from "../infra/database/CorneteiroTeamRepositoryDatabase";
import RoundRepositoryDatabase from "../infra/database/RoundRepositoryDatabase";
import TeamsOnPlayersRepositoryDatabase from "../infra/database/TeamsOnPlayersRepositoryDatabase";

export default class CorneteiroTeamController {
    constructor(readonly databaseConnection: PrismaClient) {}

    async getCorneteiroTeam(
        userId: string
    ): Promise<CorneteiroTeam | undefined> {
        const corneteiroTeamAdapter = new CorneteiroTeamAdapter();
        const corneteiroTeamRepository = new CorneteiroTeamRepositoryDatabase(
            this.databaseConnection,
            corneteiroTeamAdapter
        );
        const corneteiroTeam = await corneteiroTeamRepository.getById(userId);
        return corneteiroTeam;
    }

    async getAll(): Promise<CorneteiroTeam[] | undefined> {
        const corneteiroTeamAdapter = new CorneteiroTeamAdapter();
        const corneteiroTeamRepository = new CorneteiroTeamRepositoryDatabase(
            this.databaseConnection,
            corneteiroTeamAdapter
        );
        const corneteiroTeams = await corneteiroTeamRepository.getAll();
        return corneteiroTeams;
    }

    async createCorneteiroTeam(
        teamName: string,
        userId: string
    ): Promise<Result<CorneteiroTeam>> {
        const corneteiroTeamAdapter = new CorneteiroTeamAdapter();
        const corneteiroTeamRepository = new CorneteiroTeamRepositoryDatabase(
            this.databaseConnection,
            corneteiroTeamAdapter
        );
        const createCorneteiroTeamUseCase = new CreateCorneteiroTeam(
            corneteiroTeamRepository
        );
        const newCorneteiroTeamOrError = createCorneteiroTeamUseCase.execute(
            teamName,
            userId
        );

        return newCorneteiroTeamOrError;
    }

    async removePlayer(teamsOnPlayersId: string): Promise<Result<boolean>> {
        const teamsOnPlayerAdapter = new TeamsOnPlayersAdapter();
        const teamsOnPlayersRepository = new TeamsOnPlayersRepositoryDatabase(
            this.databaseConnection,
            teamsOnPlayerAdapter
        );
        const removeChosenPlayerUseCase = new RemoveChosenPlayer(
            teamsOnPlayersRepository
        );
        const itWasRemoved = removeChosenPlayerUseCase.execute(
            teamsOnPlayersId,
            new Date()
        );
        return itWasRemoved;
    }

    async addChosenPlayer(
        chosenPlayerId: string,
        teamId: string,
        userId: string,
        dateNow: Date
    ): Promise<Result<boolean>> {
        const corneteiroTeamAdapter = new CorneteiroTeamAdapter();
        const corneteiroTeamRepository = new CorneteiroTeamRepositoryDatabase(
            this.databaseConnection,
            corneteiroTeamAdapter
        );
        const corneteiroTeamDetailUseCase = new CorneteiroTeamDetail(
            corneteiroTeamRepository
        );
        const teamsOnPlayerAdapter = new TeamsOnPlayersAdapter();
        const teamsOnPlayersRepository = new TeamsOnPlayersRepositoryDatabase(
            this.databaseConnection,
            teamsOnPlayerAdapter
        );
        const chosenPlayerAdapter = new ChosenPlayerAdapter();
        const chosenPlayerRepository = new ChosenPlayerRepositoryDatabase(
            this.databaseConnection,
            chosenPlayerAdapter
        );
        const roundAdapter = new RoundAdapter();
        const roundRepository = new RoundRepositoryDatabase(
            this.databaseConnection,
            roundAdapter
        );
        const addChosenPlayerUseCase = new AddChosenPlayer(
            corneteiroTeamDetailUseCase,
            chosenPlayerRepository,
            teamsOnPlayersRepository,
            roundRepository
        );
        const addPlayerOrError = await addChosenPlayerUseCase.execute(
            chosenPlayerId,
            teamId,
            userId,
            dateNow
        );
        return addPlayerOrError;
    }

    async getRanking(): Promise<CorneteiroTeamShort[]> {
        const corneteiroTeamAdapter = new CorneteiroTeamAdapter();
        const corneteiroTeamRepository = new CorneteiroTeamRepositoryDatabase(
            this.databaseConnection,
            corneteiroTeamAdapter
        );
        const usecase = new CorneteiroTeamRanking(corneteiroTeamRepository);
        const ranking = usecase.execute();
        return ranking;
    }
}
