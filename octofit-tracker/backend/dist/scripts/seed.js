import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        await User.insertMany([
            { name: 'Avery Chen', email: 'avery.chen@example.com', role: 'runner' },
            { name: 'Jordan Blake', email: 'jordan.blake@example.com', role: 'coach' },
            { name: 'Mina Patel', email: 'mina.patel@example.com', role: 'cyclist' },
        ]);
        await Team.insertMany([
            { name: 'Velocity Squad', members: ['Avery Chen', 'Mina Patel'], sport: 'running' },
            { name: 'Momentum Crew', members: ['Jordan Blake'], sport: 'cross-training' },
        ]);
        await Activity.insertMany([
            { type: 'run', duration: 35, date: '2026-07-23', user: 'Avery Chen' },
            { type: 'cycling', duration: 60, date: '2026-07-21', user: 'Mina Patel' },
            { type: 'strength', duration: 45, date: '2026-07-20', user: 'Jordan Blake' },
        ]);
        await LeaderboardEntry.insertMany([
            { name: 'Avery Chen', points: 1820, streak: 7 },
            { name: 'Mina Patel', points: 1680, streak: 5 },
            { name: 'Jordan Blake', points: 1530, streak: 3 },
        ]);
        await Workout.insertMany([
            { title: 'Tempo Run', focus: 'cardio', duration: 25, difficulty: 'hard' },
            { title: 'Core Flow', focus: 'mobility', duration: 20, difficulty: 'easy' },
            { title: 'Strength Circuit', focus: 'strength', duration: 40, difficulty: 'moderate' },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
