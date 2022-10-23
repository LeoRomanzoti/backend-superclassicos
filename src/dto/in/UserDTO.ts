export default class UserDTO {
    constructor(
        readonly id: string,
        readonly phone: string,
        readonly scopes: string,
        readonly name?: string | null
    ) {}
}
