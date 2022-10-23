import UserAdapter from "../../src/adapter/UserAdapter"
import UserDTO from "../../src/dto/in/UserDTO"

test('should parse a user dto to user', () => {
    const userDTO = new UserDTO(
        "1",
        "19998305135",
        "admin;",
        "Pedro"
    )
    const adapter = new UserAdapter()
    const user = adapter.parse(userDTO)

    expect(user.scopes[0]).toBe('admin')
    expect(user.scopes.length).toBe(1)
})