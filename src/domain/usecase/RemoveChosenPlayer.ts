import TeamsOnPlayersRepository from "../repository/TeamsOnPlayersRepository";

export default class RemoveChosenPlayer {
    constructor(readonly teamsOnPlayerRepository: TeamsOnPlayersRepository) {}

    async execute(teamsOnPlayersId: string, dateNow: Date): Promise<boolean> {
        const teamsOnPlayersData = await this.teamsOnPlayerRepository.getBydId(
            teamsOnPlayersId
        );
        if (!teamsOnPlayersData) return false;
        const canRemove = teamsOnPlayersData.canRemove(dateNow);
        if (canRemove) {
            try {
                const removed = await this.teamsOnPlayerRepository.remove(
                    teamsOnPlayersId
                );
                return removed;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
        return false;
    }
}
