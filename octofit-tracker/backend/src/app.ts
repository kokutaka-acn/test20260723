import express, { type Express, type Request, type Response } from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const seedUsers = [
  { name: 'Avery Chen', email: 'avery.chen@example.com', role: 'runner' },
  { name: 'Jordan Blake', email: 'jordan.blake@example.com', role: 'coach' },
  { name: 'Mina Patel', email: 'mina.patel@example.com', role: 'cyclist' },
];

const seedTeams = [
  { name: 'Velocity Squad', members: ['Avery Chen', 'Mina Patel'], sport: 'running' },
  { name: 'Momentum Crew', members: ['Jordan Blake'], sport: 'cross-training' },
];

const seedActivities = [
  { type: 'run', duration: 35, date: '2026-07-23', user: 'Avery Chen' },
  { type: 'cycling', duration: 60, date: '2026-07-21', user: 'Mina Patel' },
  { type: 'strength', duration: 45, date: '2026-07-20', user: 'Jordan Blake' },
];

const seedLeaderboard = [
  { name: 'Avery Chen', points: 1820, streak: 7 },
  { name: 'Mina Patel', points: 1680, streak: 5 },
  { name: 'Jordan Blake', points: 1530, streak: 3 },
];

const seedWorkouts = [
  { title: 'Tempo Run', focus: 'cardio', duration: 25, difficulty: 'hard' },
  { title: 'Core Flow', focus: 'mobility', duration: 20, difficulty: 'easy' },
  { title: 'Strength Circuit', focus: 'strength', duration: 40, difficulty: 'moderate' },
];

function getApiBaseUrl(req?: Request): string {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return `http://${req?.headers.host || 'localhost:8000'}`;
}

async function getOrSeed<T extends Record<string, unknown>>(model: mongoose.Model<any>, seed: T[]): Promise<T[]> {
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
