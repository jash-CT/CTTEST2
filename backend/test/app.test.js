const request = require('supertest');
const app = require('../index');

describe('GET /workflows', () => {
  it('should fetch workflows successfully', async () => {
    const response = await request(app).get('/workflows');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /retry-example', () => {
  it('should handle retries and fetch data', async () => {
    const response = await request(app).get('/retry-example');
    expect(response.status).toBe(200);
  });
});