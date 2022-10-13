import Point from "../../domain/entity/Point";

export default class ChosenPlayersOnPointsDTO {
    constructor(
        readonly id: string,
        readonly point: Point
    ) { }
}
