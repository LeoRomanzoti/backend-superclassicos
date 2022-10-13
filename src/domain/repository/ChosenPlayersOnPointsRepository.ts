import ChosenPlayersOnPointsDTO from "../../dto/in/ChosenPlayersOnPointsListDTO"

export default interface ChosenPlayerOnPointsRespository {
    save(pointId: string, chosenPlayerId: string): Promise<boolean>
    getByChosenPlayerId(chosenPlayerId: string): Promise<ChosenPlayersOnPointsDTO[]>
}