import express, { type Express, type Request, type Response } from 'express';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const teamSchema = new mongoose.Schema({
  name: String,
  members: [String],
});

const activitySchema = new mongoose.Schema({
  type: String,
  duration: Number,
  date: String,
});

const leaderboardEntrySchema = new mongoose.Schema({
  name: String,
  points: Number,
});

const workoutSchema = new mongoose.Schema({
  title: String,
  focus: String,
  duration: Number,
});

const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);
const Activity = mongoose.model('Activity', activitySchema);
const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
const Workout = mongoose.model('Workout', workoutSchema);

const seedUsers = [
  { name: 'Avery', email: 'avery@example.com', role: 'runner' },
  { name: 'Jordan', email: 'jordan@example.com', role: 'coach' },
];

const seedTeams = [
  { name: 'Velocity', members: ['Avery', 'Jordan'] },
  { name: 'Momentum', members: ['Taylor', 'Casey'] },
];

const seedActivities = [
  { type: 'run', duration: 30, date: '2026-07-23' },
  { type: 'strength', duration: 45, date: '2026-07-22' },
];

const seedLeaderboard = [
  { name: 'Avery', points: 1800 },
  { name: 'Jordan', points: 1500 },
];

const seedWorkouts = [
  { title: 'Speed Intervals', focus: 'cardio', duration: 25 },
  { title: 'Core Strength', focus: 'mobility', duration: 20 },
];

function getApiBaseUrl(req?: Request): string {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return `http://${req?.headers.host || 'localhost:8000'}`;
}

async function getOrSeed<T>(model: mongoose.Model<any>, seed: T[]): Promise<T[]> {
  try {
    const records = await model.find({}).lean();
    if (records.length > 0) {
      return records as T[];
    }
  } catch {
    // Fall back to seeded sample data when the database is unavailable.
  }

  return seed;
}

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
  });

  app.get('/api/config', (_req: Request, res: Response) => {
    res.json({ apiBaseUrl: getApiBaseUrl() });
  });

  app.get('/api/users/', async (_req: Request, res: Response) => {
    const users = await getOrSeed(User, seedUsers);
    res.set('X-API-Base-Url', getApiBaseUrl(_req));
    res.json(users);
  });

  app.get('/api/teams/', async (_req: Request, res: Response) => {
    const teams = await getOrSeed(Team, seedTeams);
    res.set('X-API-Base-Url', getApiBaseUrl(_req));
    res.json(teams);
  });

  app.get('/api/activities/', async (_req: Request, res: Response) => {
    const activities = await getOrSeed(Activity, seedActivities);
    res.set('X-API-Base-Url', getApiBaseUrl(_req));
    res.json(activities);
  });

  app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
    const leaderboard = await getOrSeed(LeaderboardEntry, seedLeaderboard);
    res.set('X-API-Base-Url', getApiBaseUrl(_req));
    res.json(leaderboard.sort((a, b) => b.points - a.points));
  });

  app.get('/api/workouts/', async (_req: Request, res: Response) => {
    const workouts = await getOrSeed(Workout, seedWorkouts);
    res.set('X-API-Base-Url', getApiBaseUrl(_req));
    res.json(workouts);
  });

  return app;
}
