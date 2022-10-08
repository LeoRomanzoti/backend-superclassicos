import RemoveChosenPlayer from "../../src/domain/usecase/RemoveChosenPlayer";
import CorneteiroTeamRepositoryMemory from "../../src/infra/memory/CorneteiroTeamRepositoryMemory";

test("should remove one player from a corneteiro team", async () => {
    const input = {
        chosen_player_id: "1",
        corneteiro_team_id: "2",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const removePlayerUseCase = new RemoveChosenPlayer(
        corneteiroTeamRepository
    );
    let team = await removePlayerUseCase.execute(
        input.corneteiro_team_id,
        input.chosen_player_id
    );

    expect(team?.players.length).toBe(1);
});

test("should remove two player from a corneteiro team", async () => {
    let input = {
        chosen_player_id: "1",
        corneteiro_team_id: "2",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const removePlayerUseCase = new RemoveChosenPlayer(
        corneteiroTeamRepository
    );
    let team = await removePlayerUseCase.execute(
        input.corneteiro_team_id,
        input.chosen_player_id
    );

    input = {
        chosen_player_id: "2",
        corneteiro_team_id: "2",
    };

    team = await removePlayerUseCase.execute(
        input.corneteiro_team_id,
        input.chosen_player_id
    );

    expect(team?.players.length).toBe(0);
});

test("should not remove a chosen player from a corneteiro team", async () => {
    let input = {
        chosen_player_id: "12",
        corneteiro_team_id: "2",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const removePlayerUseCase = new RemoveChosenPlayer(
        corneteiroTeamRepository
    );
    let team = await removePlayerUseCase.execute(
        input.corneteiro_team_id,
        input.chosen_player_id
    );

    expect(team?.players.length).toBe(2);
});
