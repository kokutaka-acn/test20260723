import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.js';

test('GET /api/users/ returns a list of users', async () => {
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
    const response = await fetch(`http://127.0.0.1:${address.port}/api/users/`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.ok(Array.isArray(body));
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
