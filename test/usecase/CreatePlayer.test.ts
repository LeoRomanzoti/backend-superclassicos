import CreatePlayer from "../../src/domain/usecase/CreatePlayer";
import PlayerRepositoryMemory from "../../src/infra/memory/PlayerRepositoryMemory";

test("should create a new player", () => {
    const input = {
        name: "Pedro",
        position: "Lateral",
    };

    const playerRepository = new PlayerRepositoryMemory();
    const createPlayerUseCase = new CreatePlayer(playerRepository);
    const newPlayer = createPlayerUseCase.execute(input.name, input.position);

    expect(newPlayer.name).toBe("Pedro");
});
