import PlayerRepository from "../src/domain/repository/PlayerRepository";
import CorneteiroTeamRepository from "../src/domain/repository/CorneteiroTeamRepository";
import AddPlayer from "../src/domain/usecase/AddPlayer";

test("should add a player at corneteiro team", () => {
    const input = {
        idPlayer: "123",
        idteam: "123",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepository();
    const playerRepository = new PlayerRepository();
    const addPlayerUseCase = new AddPlayer(
        corneteiroTeamRepository,
        playerRepository
    );
    const team = addPlayerUseCase.execute(input.idPlayer, input.idteam);

    expect(team.players.length).toBe(1);
    expect(team.players[0].name).toBe("Pedro");
});
