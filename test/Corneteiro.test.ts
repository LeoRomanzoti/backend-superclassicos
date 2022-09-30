import AddPlayer from "../src/domain/usecase/AddPlayer";
import CorneteiroTeamDetail from "../src/domain/usecase/CorneteiroTeamDetail";
import CorneteiroTeamRepositoryMemory from "../src/infra/memory/CorneteiroTeamRepositoryMemory";
import PlayerRepositoryMemory from "../src/infra/memory/PlayerRepositoryMemory";

test("should add a player at corneteiro team", () => {
    const input = {
        player_id: "1",
        corneteiro_team_id: "1",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const corneteiroTeamDetailUseCase = new CorneteiroTeamDetail(
        corneteiroTeamRepository
    );
    let team = corneteiroTeamDetailUseCase.execute(input.corneteiro_team_id);

    expect(team?.players.length).toBe(0);

    const playerRepository = new PlayerRepositoryMemory();
    const addPlayerUseCase = new AddPlayer(
        corneteiroTeamRepository,
        playerRepository
    );
    team = addPlayerUseCase.execute(input.player_id, input.corneteiro_team_id);

    expect(team?.players.length).toBe(1);
    expect(team?.players[0].name).toBe("Pedro");
});
