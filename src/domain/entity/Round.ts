export default class Round {
    constructor(
        readonly roundId: string,
        readonly startDate: Date,
        readonly endDate: Date,
        readonly number: number,
        readonly open: boolean
    ) {}

    isClose(dateNow: Date): boolean {
        if (dateNow >= this.endDate) return true;
        return false;
    }
}
