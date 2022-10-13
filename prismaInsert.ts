import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

// run inside `async` function
// const nenwPlayer = prisma.player.create({
//     data: {
//         name: 'Pajé',
//         position: 'Zagueiro',
//     },
// })
// nenwPlayer.then(res => console.log(res))

// const newChosenPlayer = prisma.chosenPlayer.create({
//     data: {
//         score: 0,
//         roundId: "afa90a0a-3e7e-4f2a-bb78-1134052d2919",
//         playerId: "5eeb99e4-dced-4c5f-a8c2-ffefc7593ad0"
//     }
// })
// newChosenPlayer.then(res => console.log(res))

// const newTeam = prisma.team.create({
//     data: {
//         name: "Tabajara",
//         userId: "b9ae6a07-f5ab-472c-8d25-65afa4b22b6a"
//     }
// })
// newTeam.then(res => console.log(res))

// const addPlayer = prisma.teamsOnPlayers.create({
//     data: {
//         chosenPlayerId: "0216ce8a-538b-4b6b-acc3-83b8440eab96",
//         teamId: "cccd24a6-3570-4d65-855d-21b5667f99c1"
//     }
// })
// addPlayer.then(res => console.log(res))


const addPlayer = prisma.chosenPlayersOnPoints.findMany({
    select: {
        id: true,
        point: true
    }
})
addPlayer.then(res => console.log(res))

// const newRound = prisma.round.create({
//     data: {
//         start_date: "2022-12-01",
//         end_data: "2022-12-19",
//         number: 1,

//     }
// })
// newRound.then(res => console.log(res))