export default class CorneteiroTeamShort {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly score: number,
        readonly userName: string | null
    ) {}
}
