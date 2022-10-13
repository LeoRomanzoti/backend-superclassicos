import Result from "../../common/Result";
import CorneteiroTeamChosenPlayerDTO, { CorneteiroTeamChosenPlayerData } from "../../dto/in/CorneteiroTeamChosenPlayerDTO";
import PlayerDTO from "../../dto/in/PlayerDTO";
import ChosenPlayerRepository from "../repository/ChosenPlayerRespository";
import TeamsOnPlayersRepository from "../repository/TeamsOnPlayersRepository";
import CorneteiroTeamDetail from "./CorneteiroTeamDetail";

export default class AddChosenPlayer {
    constructor(
        readonly corneteiroTeamDetailUseCase: CorneteiroTeamDetail,
        readonly chosenPlayerRepository: ChosenPlayerRepository,
        readonly teamsOnPlayersRepository: TeamsOnPlayersRepository
    ) { }

    async execute(
        chosenPlayerId: string,
        corneteiroTeamId: string,
        userId: string,
    ): Promise<Result<boolean>> {
        try {
            const team = await this.corneteiroTeamDetailUseCase.execute(
                userId
            );
            if (!team) return Result.fail('Time não existe.');

            const chosenPlayer = await this.chosenPlayerRepository.getById(
                chosenPlayerId
            );
            if (!chosenPlayer) return Result.fail('Jogador escolhido não exite.');

            const playerDTO = new PlayerDTO(
                chosenPlayer.player.playerId,
                chosenPlayer.player.name,
                chosenPlayer.player.position
            )
            const chosenPlayerDataDTO = new CorneteiroTeamChosenPlayerData(
                chosenPlayer.chosenPlayerId,
                chosenPlayer.score,
                playerDTO
            )
            const chosenPlayerDTO = new CorneteiroTeamChosenPlayerDTO(
                chosenPlayer.chosenPlayerId,
                chosenPlayerDataDTO
            )

            if (team.isFull()) return Result.fail('Seu time já está completo.')
            if (team.positionIsFull(playerDTO?.position)) return Result.fail('Você já tem o máximo de jogadores para essa posição.')
            if (team.playerAlreadyExist(chosenPlayerDTO?.chosenPlayer?.id)) return Result.fail('Esse jogador já existe no seu time.')
            team.addPlayer(chosenPlayerDTO);

            await this.teamsOnPlayersRepository.save(chosenPlayerId, corneteiroTeamId)

            return Result.ok(true)
        } catch (error) {
            console.log(error)
            return Result.fail("Ocorreu um erro inesperado.")
        }
    }
}
