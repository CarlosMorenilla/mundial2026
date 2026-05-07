const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Sample group stage matches for Mundial 2026
  const matches = [
    {
      homeTeam: 'Mexico',
      awayTeam: 'Canada',
      date: new Date('2026-06-11T20:00:00Z'),
      matchday: 1,
      group: 'A'
    },
    {
      homeTeam: 'USA',
      awayTeam: 'Mexico',
      date: new Date('2026-06-17T20:00:00Z'),
      matchday: 2,
      group: 'A'
    },
    {
      homeTeam: 'Canada',
      awayTeam: 'USA',
      date: new Date('2026-06-23T20:00:00Z'),
      matchday: 3,
      group: 'A'
    }
  ];

  for (const match of matches) {
    await prisma.match.create({ data: match });
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
