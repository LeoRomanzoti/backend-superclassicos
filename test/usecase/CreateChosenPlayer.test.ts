import CreateChosenPlayer from "../../src/domain/usecase/CreateChosenPlayer";
import PlayerRepositoryMemory from "../../src/infra/memory/PlayerRepositoryMemory";
import RoundRepositoryMemory from "../../src/infra/memory/RoundRepositoryMemory";

test("should create a chosen player", () => {
    const input = {
        player_id: "2",
        round_id: "1",
    };
    const playerRepository = new PlayerRepositoryMemory();
    const roundRepository = new RoundRepositoryMemory();
    const createChosenPlayerUseCase = new CreateChosenPlayer(
        playerRepository,
        roundRepository
    );
    const chosenPlayer = createChosenPlayerUseCase.execute(
        input.player_id,
        input.round_id
    );

    expect(chosenPlayer?.player.name).toBe("Leo");
});
