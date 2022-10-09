export default class User {
    constructor(
        readonly id: string,
        readonly phone: string,
        readonly name?: string | null
    ) {}
}
