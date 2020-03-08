const request = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');


describe('test the root route', () => {
   test('it should make a get request', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
   });

   test('it should connect to cloud database successfuly', async () => {

   });

   test('it should connect to cloudamqp', async () => {

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
