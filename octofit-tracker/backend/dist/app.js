import express from 'express';
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
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
}
async function getOrSeed(model, seed) {
    try {
        const records = await model.find({}).lean();
        if (records.length > 0) {
            return records;
        }
    }
    catch {
        // Fall back to seeded sample data when the database is unavailable.
    }
    return seed;
}
export function createApp() {
    const app = express();
    app.use(express.json());
    app.get('/api/health', (_req, res) => {
        res.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
    });
    app.get('/api/config', (_req, res) => {
        res.json({ apiBaseUrl: getApiBaseUrl() });
    });
    app.get('/api/users/', async (_req, res) => {
        const users = await getOrSeed(User, seedUsers);
        res.set('X-API-Base-Url', getApiBaseUrl());
        res.json(users);
    });
    app.get('/api/teams/', async (_req, res) => {
        const teams = await getOrSeed(Team, seedTeams);
        res.set('X-API-Base-Url', getApiBaseUrl());
        res.json(teams);
    });
    app.get('/api/activities/', async (_req, res) => {
        const activities = await getOrSeed(Activity, seedActivities);
        res.set('X-API-Base-Url', getApiBaseUrl());
        res.json(activities);
    });
    app.get('/api/leaderboard/', async (_req, res) => {
        const leaderboard = await getOrSeed(LeaderboardEntry, seedLeaderboard);
        res.set('X-API-Base-Url', getApiBaseUrl());
        res.json(leaderboard.sort((a, b) => b.points - a.points));
    });
    app.get('/api/workouts/', async (_req, res) => {
        const workouts = await getOrSeed(Workout, seedWorkouts);
        res.set('X-API-Base-Url', getApiBaseUrl());
        res.json(workouts);
    });
    return app;
}
