import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '../../../../app';
import createConnection from '../../../../database';

let connection: Connection;

describe('CreateUserController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a user', async () => {
    const response = await request(app).post('/api/v1/users').send({
      name: 'test-user',
      email: 'user@email.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a user with existent email', async () => {
    const response = await request(app).post('/api/v1/users').send({
      name: 'test-user2',
      email: 'user@email.com',
      password: '123456',
    });

    expect(response.status).toBe(400);
  });
});
