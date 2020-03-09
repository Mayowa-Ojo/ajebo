const request = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');
const { connect_rmq } = require('../src/config/rabbitmq_config');


describe('test the root route', () => {
   test('it should make a get request', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
   });

   test('it should connect to rabbitmq', async () => {
      connect_rmq((connection) => {
         expect(typeof connection).toBe('object');
      });
   });

   afterAll(async (done) => {
      await mongoose.connection.close((err) => {
         if(err) {
            console.error(err);
            done();
         }
         done();
      });
   });
});
