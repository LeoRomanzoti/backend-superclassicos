import CorneteiroTeam from "../entity/CorneteiroTeam";

export default class TeamRepository {
    getById(corneteiroTeamId) {
        return new CorneteiroTeam("123", []);
    }
}
