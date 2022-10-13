import Result from "../../common/Result";
import ChosenPlayer from "../entity/ChosenPlayer";
import ChosenPlayerRepository from "../repository/ChosenPlayerRespository";
import ChosenPlayerOnPointsRespository from "../repository/ChosenPlayersOnPointsRepository";
import PointRepository from "../repository/PointRepository";

export default class AddPointToChosenPlayer {
    constructor(readonly chosenPlayerOnPointsRepository: ChosenPlayerOnPointsRespository, readonly chosenPlayerRepository: ChosenPlayerRepository, readonly pointRepository: PointRepository) { }

    async execute(pointId: string, chosenPlayerId: string): Promise<Result<ChosenPlayer>> {
        const chosenPlayer = await this.chosenPlayerRepository.getById(chosenPlayerId)
        if (!chosenPlayer) return Result.fail('Jogador não existe.')

        const point = await this.pointRepository.getById(pointId)
        if (!point) return Result.fail('Ponto não existe.')

        const sumPointToUpdate = chosenPlayer.sumPoint(point?.value)
        await this.chosenPlayerOnPointsRepository.save(pointId, chosenPlayerId)
        const chosenPlayerUpdated = await this.chosenPlayerRepository.updateWithPoint(chosenPlayerId, sumPointToUpdate)

        return Result.ok(chosenPlayerUpdated)
    }
}