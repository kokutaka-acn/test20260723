import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
});
const teamSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: String, required: true }],
    sport: { type: String, default: 'fitness' },
});
const activitySchema = new Schema({
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: true },
    user: { type: String, required: true },
});
const leaderboardEntrySchema = new Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
    streak: { type: Number, default: 0 },
});
const workoutSchema = new Schema({
    title: { type: String, required: true },
    focus: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, default: 'moderate' },
});
export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.model('Workout', workoutSchema);
