const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing matches
  await prisma.prediction.deleteMany();
  await prisma.match.deleteMany();
  
  const matches = [
    // Group A
    { homeTeam: 'Mexico', awayTeam: 'Canada', date: new Date('2026-06-11T20:00:00Z'), matchday: 1, group: 'A' },
    { homeTeam: 'USA', awayTeam: 'Brazil', date: new Date('2026-06-12T20:00:00Z'), matchday: 1, group: 'A' },
    { homeTeam: 'Mexico', awayTeam: 'USA', date: new Date('2026-06-17T20:00:00Z'), matchday: 2, group: 'A' },
    { homeTeam: 'Canada', awayTeam: 'Brazil', date: new Date('2026-06-18T20:00:00Z'), matchday: 2, group: 'A' },
    { homeTeam: 'USA', awayTeam: 'Canada', date: new Date('2026-06-23T20:00:00Z'), matchday: 3, group: 'A' },
    { homeTeam: 'Brazil', awayTeam: 'Mexico', date: new Date('2026-06-23T20:00:00Z'), matchday: 3, group: 'A' },
    
    // Group B
    { homeTeam: 'France', awayTeam: 'Germany', date: new Date('2026-06-12T20:00:00Z'), matchday: 1, group: 'B' },
    { homeTeam: 'Spain', awayTeam: 'England', date: new Date('2026-06-13T20:00:00Z'), matchday: 1, group: 'B' },
    { homeTeam: 'France', awayTeam: 'Spain', date: new Date('2026-06-18T20:00:00Z'), matchday: 2, group: 'B' },
    { homeTeam: 'Germany', awayTeam: 'England', date: new Date('2026-06-19T20:00:00Z'), matchday: 2, group: 'B' },
    { homeTeam: 'England', awayTeam: 'France', date: new Date('2026-06-23T20:00:00Z'), matchday: 3, group: 'B' },
    { homeTeam: 'Germany', awayTeam: 'Spain', date: new Date('2026-06-23T20:00:00Z'), matchday: 3, group: 'B' },
    
    // Group C
    { homeTeam: 'Argentina', awayTeam: 'Portugal', date: new Date('2026-06-13T20:00:00Z'), matchday: 1, group: 'C' },
    { homeTeam: 'Italy', awayTeam: 'Netherlands', date: new Date('2026-06-14T20:00:00Z'), matchday: 1, group: 'C' },
    { homeTeam: 'Argentina', awayTeam: 'Italy', date: new Date('2026-06-19T20:00:00Z'), matchday: 2, group: 'C' },
    { homeTeam: 'Portugal', awayTeam: 'Netherlands', date: new Date('2026-06-20T20:00:00Z'), matchday: 2, group: 'C' },
    { homeTeam: 'Netherlands', awayTeam: 'Argentina', date: new Date('2026-06-24T20:00:00Z'), matchday: 3, group: 'C' },
    { homeTeam: 'Portugal', awayTeam: 'Italy', date: new Date('2026-06-24T20:00:00Z'), matchday: 3, group: 'C' },
  ];
  
  for (const match of matches) {
    await prisma.match.create({ data: match });
  }
  
  console.log(`Created ${matches.length} matches`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
