import ChosenPlayer from "../../src/domain/entity/ChosenPlayer"
import Player from "../../src/domain/entity/Player"
import Round from "../../src/domain/entity/Round"
import TeamsOnPlayers from "../../src/domain/entity/TeamsOnPlayers"

test('should can remove a teamsOnPlayers', () => {
    const player = new Player("1", "Pedro", "Lateral")
    const round = new Round("1", new Date("2022-10-22"), new Date("2022-10-29"), 1, true)
    const chosenPlayer = new ChosenPlayer("01", player, round, 0)

    const teamsOnPlayers = new TeamsOnPlayers("01", "01", "01", chosenPlayer)
    const canRemove = teamsOnPlayers.canRemove(new Date('2022-10-28'))
    expect(canRemove).toBe(true)
})

test('should not remove a teamsOnPlayers', () => {
    const player = new Player("1", "Pedro", "Lateral")
    const round = new Round("1", new Date("2022-10-22"), new Date("2022-10-29"), 1, true)
    const chosenPlayer = new ChosenPlayer("01", player, round, 0)

    const teamsOnPlayers = new TeamsOnPlayers("01", "01", "01", chosenPlayer)
    const canRemove = teamsOnPlayers.canRemove(new Date('2022-10-30'))
    expect(canRemove).toBe(false)
})