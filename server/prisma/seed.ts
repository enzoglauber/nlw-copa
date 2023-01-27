import { PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'jd@gmail.com',
      avatarUrl: 'https://github.com/enzoglauber.png'
    }
  })

  
  const pool = await prisma.pool.create({
    data: {
      title: 'Example pool', 
      code: 'BOL123',
      participants: {
        // connect:         connecta a uma entidade ja existente
        // connectOrCreate: se a entidade nao existe ele cria 
        // create:          cria a entidade para relactionamento
        create: {
          userId: user.id
        }
      },
      ownerId: user.id,
    }
  })
  
  await prisma.game.create({
    data: {
      date: new Date('2022-11-02T12:00:00.201Z'),
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

    
  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamScore: 5,
          secondTeamScore: 1,

          participant: {
            connect: {
              userId_poolId: {
                poolId: pool.id,
                userId: user.id
              }
            }
          }
        }
      }
    }
  })
}

main()