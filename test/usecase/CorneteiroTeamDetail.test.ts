import CorneteiroTeamDetail from "../../src/domain/usecase/CorneteiroTeamDetail";
import CorneteiroTeamRepositoryMemory from "../../src/infra/memory/CorneteiroTeamRepositoryMemory";

test("should get a corneteiro team empty", async () => {
    const input = {
        player_id: "1",
        corneteiro_team_id: "1",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const corneteiroTeamDetailUseCase = new CorneteiroTeamDetail(
        corneteiroTeamRepository
    );
    let team = await corneteiroTeamDetailUseCase.execute(
        input.corneteiro_team_id
    );

    expect(team?.players.length).toBe(0);
});

test("should get a corneteiro team empty", async () => {
    const input = {
        player_id: "1",
        corneteiro_team_id: "1",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const corneteiroTeamDetailUseCase = new CorneteiroTeamDetail(
        corneteiroTeamRepository
    );
    let team = await corneteiroTeamDetailUseCase.execute(
        input.corneteiro_team_id
    );

    expect(team?.players.length).toBe(0);
});
