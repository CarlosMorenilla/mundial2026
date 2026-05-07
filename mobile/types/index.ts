export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  matchday: number;
  status: string;
}

export interface Prediction {
  id: string;
  matchId: string;
  predictedWinner: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  points: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
}
