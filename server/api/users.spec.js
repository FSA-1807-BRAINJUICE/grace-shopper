/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    xit('GET /api/users', async () => {
      await request(app)
        .get('/api/users')
        .expect(403)

      //expect(res.body).to.be.an('array')
      //expect(res.body[0].email).to.be.equal(codysEmail)
    })

    xit('POST /api/users - avoiding a duplicate account creation', async () => {
      await request(app)
      .post('/api/users')
      .send({
        email: codysEmail
      })
      .expect(403);

    });

    xit('POST /api/users', async () => {
      const res = await request(app)
      .post('/api/users')
      .send({
        email: "cody2@puppybook.com",
        password: 'pwd123',
      })

      expect(res.body.email).to.be.equal('cody2@puppybook.com');
    });
  }) // end describe('/api/users')
}) // end describe('User routes')
