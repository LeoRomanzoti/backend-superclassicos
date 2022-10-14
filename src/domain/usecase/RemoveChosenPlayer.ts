import Result from "../../common/Result";
import TeamsOnPlayersRepository from "../repository/TeamsOnPlayersRepository";

export default class RemoveChosenPlayer {
    constructor(readonly teamsOnPlayerRepository: TeamsOnPlayersRepository) {}

    async execute(
        teamsOnPlayersId: string,
        dateNow: Date
    ): Promise<Result<boolean>> {
        const teamsOnPlayersData = await this.teamsOnPlayerRepository.getBydId(
            teamsOnPlayersId
        );
        if (!teamsOnPlayersData) return Result.fail("Jogador não existe.");
        const canRemove = teamsOnPlayersData.canRemove(dateNow);
        if (!canRemove)
            return Result.fail(
                "Rodada já está fechada. Você não pode mais alterar esse jogador."
            );
        const removed = await this.teamsOnPlayerRepository.remove(
            teamsOnPlayersId
        );
        return Result.ok(removed);
    }
}
