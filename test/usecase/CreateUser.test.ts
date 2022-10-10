import CreateUser from "../../src/domain/usecase/CreateUser"
import UserRepositoryMemory from "../../src/infra/memory/UserRepositoryMemory"

test('should create a new user', async () => {
    const input = {
        name: "Pedro",
        phone: "19998305135"
    }

    const useRepository = new UserRepositoryMemory()
    const createUserUseCase = new CreateUser(useRepository)
    const newUser = await createUserUseCase.execute(input.name, input.phone)

    expect(newUser?.phone).toBe("19998305135")
    expect(newUser?.name).toBe("Pedro")
})