import CorneteiroTeamDetail from "../../src/domain/usecase/CorneteiroTeamDetail";
import RemovePlayer from "../../src/domain/usecase/RemovePlayer";
import CorneteiroTeamRepositoryMemory from "../../src/infra/memory/CorneteiroTeamRepositoryMemory";

test("should remove one player from a corneteiro team", () => {
    const input = {
        chosen_player_id: "1",
        corneteiro_team_id: "2",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const removePlayerUseCase = new RemovePlayer(corneteiroTeamRepository);
    let team = removePlayerUseCase.execute(
        input.corneteiro_team_id,
        input.chosen_player_id
    );

    expect(team?.players.length).toBe(1);
});

test("should remove two player from a corneteiro team", () => {
    let input = {
        player_id: "1",
        corneteiro_team_id: "2",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const removePlayerUseCase = new RemovePlayer(corneteiroTeamRepository);
    let team = removePlayerUseCase.execute(
        input.corneteiro_team_id,
        input.player_id
    );

    input = {
        player_id: "2",
        corneteiro_team_id: "2",
    };

    team = removePlayerUseCase.execute(
        input.corneteiro_team_id,
        input.player_id
    );

    expect(team?.players.length).toBe(0);
});
