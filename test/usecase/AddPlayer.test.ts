import AddPlayer from "../../src/domain/usecase/AddPlayer";
import CorneteiroTeamDetail from "../../src/domain/usecase/CorneteiroTeamDetail";
import ChosenPlayerRepositoryMemory from "../../src/infra/memory/ChosenPlayerRespositoryMemory";
import CorneteiroTeamRepositoryMemory from "../../src/infra/memory/CorneteiroTeamRepositoryMemory";

test("should add a player at corneteiro team", () => {
    const input = {
        corneteiro_player_id: "1",
        corneteiro_team_id: "1",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const corneteiroTeamDetailUseCase = new CorneteiroTeamDetail(
        corneteiroTeamRepository
    );
    let corneteiroTeamDetail = corneteiroTeamDetailUseCase.execute(
        input.corneteiro_team_id
    );

    expect(corneteiroTeamDetail?.players.length).toBe(0);

    const chosenPlayerlayerRepository = new ChosenPlayerRepositoryMemory();
    const addPlayerUseCase = new AddPlayer(
        corneteiroTeamRepository,
        chosenPlayerlayerRepository
    );
    addPlayerUseCase.execute(
        input.corneteiro_player_id,
        input.corneteiro_team_id
    );

    expect(corneteiroTeamDetail?.players.length).toBe(1);
    expect(corneteiroTeamDetail?.players[0].player.name).toBe("Pedro");
});
