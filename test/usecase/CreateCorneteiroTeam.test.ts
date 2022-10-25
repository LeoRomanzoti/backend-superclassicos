import CreateCorneteiroTeam from "../../src/domain/usecase/CreateCorneteiroTeam"
import CorneteiroTeamRepositoryMemory from "../../src/infra/memory/CorneteiroTeamRepositoryMemory"

test('should create a new corneteiro team to a user', async () => {

    const userId = '01'

    const input = {
        team_name: 'Tabajara'
    }

    const corneteiroteamRepository = new CorneteiroTeamRepositoryMemory()
    const createCornteiroTeamUseCase = new CreateCorneteiroTeam(corneteiroteamRepository)
    const newCorneteiroTeam = await createCornteiroTeamUseCase.execute(input.team_name, userId)

    expect(newCorneteiroTeam?.getValue()?.name).toBe('Tabajara')
})