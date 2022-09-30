import CreateChosenPlayer from "../../src/domain/usecase/CreateChosenPlayer";
import ChosenPlayerRepositoryMemory from "../../src/infra/memory/ChosenPlayerRespositoryMemory";
import PlayerRepositoryMemory from "../../src/infra/memory/PlayerRepositoryMemory";
import RoundRepositoryMemory from "../../src/infra/memory/RoundRepositoryMemory";

test("should create a chosen player", () => {
    const input = {
        player_id: "2",
        round_id: "1",
    };
    const playerlayerRepository = new PlayerRepositoryMemory();
    const roundRepository = new RoundRepositoryMemory();
    const createChosenPlayerUseCase = new CreateChosenPlayer(
        playerlayerRepository,
        roundRepository
    );
    const chosenPlayer = createChosenPlayerUseCase.execute(
        input.player_id,
        input.round_id
    );

    expect(chosenPlayer?.player.name).toBe("Leo");
});
