export default class User {
    constructor(
        readonly id: string,
        readonly phone: string,
        readonly scopes: string[],
        readonly name?: string | null
    ) {}
}
