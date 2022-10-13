import Point from "../../domain/entity/Point";
import ChosenPlayerOnPointsRespository from "../../domain/repository/ChosenPlayersOnPointsRepository";
import ChosenPlayersOnPointsDTO from "../../dto/in/ChosenPlayersOnPointsListDTO";

export default class ChosenPlayerOnPointsRespositoryMemory
    implements ChosenPlayerOnPointsRespository
{
    chosenPlyersOnPoints: ChosenPlayersOnPointsDTO[];

    constructor() {
        this.chosenPlyersOnPoints = [
            new ChosenPlayersOnPointsDTO("1", new Point("1", 8, "Gol", "G")),
            new ChosenPlayersOnPointsDTO("2", new Point("1", 8, "Gol", "G")),
            new ChosenPlayersOnPointsDTO("3", new Point("1", 8, "Gol", "G")),
            new ChosenPlayersOnPointsDTO("4", new Point("1", 8, "Gol", "G")),
            new ChosenPlayersOnPointsDTO("5", new Point("1", 8, "Gol", "G")),
        ];
    }

    async save(pointId: string, chosenPlayerId: string): Promise<boolean> {
        const newPoint = new ChosenPlayersOnPointsDTO(
            "7",
            new Point(pointId, 8, "Gol", "G")
        );
        this.chosenPlyersOnPoints.push(newPoint);
        return true;
    }

    async getByChosenPlayerId(
        chosenPlayerId: string
    ): Promise<ChosenPlayersOnPointsDTO[]> {
        return this.chosenPlyersOnPoints;
    }
}
