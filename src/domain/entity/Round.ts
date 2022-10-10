export default class Round {
    constructor(
        readonly roundId: string,
        readonly startDate: Date,
        readonly endDate: Date,
        readonly number: number
    ) {}
}
