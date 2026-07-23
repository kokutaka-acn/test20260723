import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.js';

const endpoints = [
  '/api/users/',
  '/api/teams/',
  '/api/activities/',
  '/api/leaderboard/',
  '/api/workouts/',
];

test('API endpoints return seeded data payloads', async () => {
  const app = createApp();
  const server = app.listen(0);

  await new Promise<void>((resolve) => {
    server.once('listening', () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Server did not bind to an address');
  }

  try {
    for (const endpoint of endpoints) {
      const response: Response = await fetch(`http://127.0.0.1:${address.port}${endpoint}`);
      assert.equal(response.status, 200, `${endpoint} should respond with 200`);
      const body = await response.json();
      assert.ok(Array.isArray(body), `${endpoint} should return an array`);
      assert.ok(body.length > 0, `${endpoint} should include seeded records`);
    }
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
