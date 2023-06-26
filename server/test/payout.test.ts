const request = require('supertest');
const app = require('../src/app').default;
import { server } from '../src/app';

// Close the server after each test
afterAll((done) => {
  server.close(done);
});

// Set up the test environment
process.env.NODE_ENV = 'test';

describe('POST /expense/add', () => {
    it('calculates payouts correctly', async () => {
      const expenses = [
        { name: 'Adriana', amount: 5.75 },
        { name: 'Adriana', amount: 5.75 },
        { name: 'Bao', amount: 12 },
      ];
  
      const response = await request(app)
        .post('/expense/add')
        .send({ expenses });
  
      // Add your assertions here
      expect(response.status).toBe(200);
      expect(response.body.total).toBe(23.5);
    });
  });