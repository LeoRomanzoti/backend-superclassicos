import Round from "../domain/entity/Round";
import RoundDTO from "../dto/in/RoundDTO";

export default class RoundAdapter {
    parse(roundData: RoundDTO): Round {
        const round = new Round(
            roundData.id,
            new Date(roundData.start_date),
            new Date(roundData.end_date),
            roundData.number,
            roundData.open
        );
        return round;
    }
}
