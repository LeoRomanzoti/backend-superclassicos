import AddChosenPlayer from "../../src/domain/usecase/AddChosenPlayer";
import CorneteiroTeamDetail from "../../src/domain/usecase/CorneteiroTeamDetail";
import ChosenPlayerRepositoryMemory from "../../src/infra/memory/ChosenPlayerRespositoryMemory";
import CorneteiroTeamRepositoryMemory from "../../src/infra/memory/CorneteiroTeamRepositoryMemory";

test("should add a chosen player at corneteiro team", async () => {
    const input = {
        chosen_player_id: "1",
        corneteiro_team_id: "1",
    };

    const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
    const corneteiroTeamDetailUseCase = new CorneteiroTeamDetail(
        corneteiroTeamRepository
    );
    let corneteiroTeamDetail = await corneteiroTeamDetailUseCase.execute(
        input.corneteiro_team_id
    );

    expect(corneteiroTeamDetail?.players.length).toBe(0);

    const chosenPlayerRepository = new ChosenPlayerRepositoryMemory();
    const addPlayerUseCase = new AddChosenPlayer(
        corneteiroTeamRepository,
        chosenPlayerRepository
    );
    addPlayerUseCase.execute(input.chosen_player_id, input.corneteiro_team_id);

    expect(corneteiroTeamDetail?.players.length).toBe(1);
    expect(corneteiroTeamDetail?.players[0].player.name).toBe("Pedro");
});
