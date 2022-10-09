import TeamsOnPlayersAdapter from "../../src/adapter/TeamsOnPlayersAdapter";
import RemoveChosenPlayer from "../../src/domain/usecase/RemoveChosenPlayer";
import TeamsOnPlayersRepositoryMemory from "../../src/infra/memory/TeamsOnPlayersRepositoryMemory";

test("should remove one player from a corneteiro team", async () => {
    const input = {
        teamsOnPlayersId: "01",
    };

    const teamsOnPlayersAdapter = new TeamsOnPlayersAdapter()
    const teamsOnPlayersRepository = new TeamsOnPlayersRepositoryMemory(teamsOnPlayersAdapter);
    const removePlayerUseCase = new RemoveChosenPlayer(
        teamsOnPlayersRepository,
    );

    const itWasRemoved = await removePlayerUseCase.execute(
        input.teamsOnPlayersId,
        new Date('2022-10-28')
    );

    expect(itWasRemoved).toBe(true);
});

test("should not remove one player from a corneteiro team", async () => {
    const input = {
        teamsOnPlayersId: "01",
    };

    const teamsOnPlayersAdapter = new TeamsOnPlayersAdapter()
    const teamsOnPlayersRepository = new TeamsOnPlayersRepositoryMemory(teamsOnPlayersAdapter);
    const removePlayerUseCase = new RemoveChosenPlayer(
        teamsOnPlayersRepository,
    );

    const itWasRemoved = await removePlayerUseCase.execute(
        input.teamsOnPlayersId,
        new Date('2022-10-30')
    );

    expect(itWasRemoved).toBe(false);
});

// test("should not remove a chosen player from a corneteiro team", async () => {
//     let input = {
//         chosen_player_id: "12",
//         corneteiro_team_id: "2",
//     };

//     const corneteiroTeamRepository = new CorneteiroTeamRepositoryMemory();
//     const removePlayerUseCase = new RemoveChosenPlayer(
//         corneteiroTeamRepository
//     );
//     let team = await removePlayerUseCase.execute(
//         input.corneteiro_team_id,
//         input.chosen_player_id
//     );

//     expect(team?.players.length).toBe(2);
// });
