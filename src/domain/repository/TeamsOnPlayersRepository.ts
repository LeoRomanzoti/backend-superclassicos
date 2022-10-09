import TeamsOnPlayers from "../entity/TeamsOnPlayers";

export default interface TeamsOnPlayersRepository {
    save(chosenPlayerId: string, teamId: string): Promise<boolean>;
    remove(teamsOnPlayersId: string): Promise<boolean>;
    getBydId(teamsOnPlayersId: string): Promise<TeamsOnPlayers | undefined>;
}
