import AddPointToChosenPlayer from "../../src/domain/usecase/AddPointToChosenPlayer"
import ChosenPlayerRepositoryMemory from "../../src/infra/memory/ChosenPlayerRespositoryMemory"
import ChosenPlayerOnPointsRespositoryMemory from "../../src/infra/memory/ChosenPlayersOnPointsRepositoryMemory"
import PointRepositoryMemory from "../../src/infra/memory/PointRepositoryMemory"

test('should add 8 point to a player', async () => {
    const input = {
        point_id: "1",
        chosen_player_id: "1"
    }

    const chosenPlayerRepository = new ChosenPlayerRepositoryMemory()
    const chosenPlayerOnPointsRepository = new ChosenPlayerOnPointsRespositoryMemory()
    const pointRepository = new PointRepositoryMemory()
    const useCase = new AddPointToChosenPlayer(chosenPlayerOnPointsRepository, chosenPlayerRepository, pointRepository)
    await useCase.execute(input.point_id, input.chosen_player_id)

    const points = await chosenPlayerOnPointsRepository.getByChosenPlayerId(input.chosen_player_id)

    expect(points.length).toBe(6)
})