export default class AddPlayer {
    constructor(corneteiroTeamRepository, playerRepository) {
        this.corneteiroTeamRepository = corneteiroTeamRepository;
        this.playerRepository = playerRepository;
    }

    execute(playerId, corneteiroTeamId) {
        const team = this.corneteiroTeamRepository.getById(corneteiroTeamId);
        const player = this.playerRepository.getById(playerId);
        team.addPlayer(player);
        return team;
    }
}
