import app from '../src/app';
import request from 'supertest';

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health').expect(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /noneexistent', () => {
    it('should return 404', async () => {
      const response = await request(app).get('/noneexistent').expect(404);
      expect(response.body).toHaveProperty('message', 'Not found');
    });
  });
});
