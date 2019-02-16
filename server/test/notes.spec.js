const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const expect = require('chai').expect;

const USER_ID_1 = config.USER_ID_1;
const USER_ID_2 = config.USER_ID_2;
const USER_ID_3 = config.USER_ID_3;
let NOTE_ID = '';

//  testsuite
describe('Testing to add a note', function()
{
  //  testcase
  it('Should handle a request to add a new note for user 1 ', function(done)
  {
    // Should get added note of user 1 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    request(app)
    .post(`/api/v1/notes/?userId=${USER_ID_1}`)
    .send(config.NOTE_1)
    .expect(201)
    .then((response) => {
      NOTE_ID = response.body.id;

      expect(response.body.title).to.equal(config.NOTE_1.title);
      expect(response.body.text).to.equal(config.NOTE_1.text);
      done();
    });
  });

  //  testcase
  it('Should handle a request to add a new note for user 2', function(done)
  {
    // Should get added note of user 2 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    request(app)
    .post(`/api/v1/notes/?userId=${USER_ID_2}`)
    .send(config.NOTE_2)
    .expect(201)
    .then((response) => {

      expect(response.body.title).to.equal(config.NOTE_2.title);
      expect(response.body.text).to.equal(config.NOTE_2.text);
      done();
    });
  });
});

//  testsuite
describe('Testing to get all notes', function()
{
  //  testcase
  it('Should handle a request to get all notes of a user 1', function(done)
  {
    // Should get all note as a array those are created by user 1 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 1
    request(app)
    .get(`/api/v1/notes/?userId=${USER_ID_1}`)
    .expect(200)
    .then((response) => {
      expect(response.body).to.be.an('array');
      expect(response.body[0].title).to.equal(config.NOTE_1.title);
      expect(response.body[0].text).to.equal(config.NOTE_1.text);
      done();
    }).catch((error) => {
      done(error);
    });
  });

  //  testcase
  it('Should handle a request to get all notes of a user 2', function(done)
  {
    // Should get all note as a array those are created by user 2 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 2
    request(app)
    .get(`/api/v1/notes/?userId=${USER_ID_2}`)
    .expect(200)
    .then((response) => {
      expect(response.body).to.be.an('array');
      expect(response.body[0].title).to.equal(config.NOTE_2.title);
      expect(response.body[0].text).to.equal(config.NOTE_2.text);
      done();
    }).catch((error) => {
      done(error);
    });

  });

  //  testcase
  it('Should handle a request to get notes of a user who has not created any note', function(done)
  {
    // should get blank array
    // status = 200
    // response will be an empty array
    request(app)
    .get(`/api/v1/notes/?userId=${USER_ID_3}`)
    .expect(200)
    .then((response) => {
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(0);
      done();
    }).catch((error) => {
      done(error);
    });
  });
});

//  testsuite
describe('Testing to update a note', function()
{
  //  testcase
  it('Should handle a request to update a note by note id', function(done)
  {
    // Should return updated note and match updated note text value'
    // status = 200
    // response will hold updated note as an object
    const newText = 'newText for note 1';
    config.NOTE_1.text = newText;
    request(app)
    .put(`/api/v1/notes/${NOTE_ID}`)
    .send(config.NOTE_1)
    .expect(200)
    .then((response) => {
      expect(response.body.title).to.equal(config.NOTE_1.title);
      expect(response.body.text).to.equal(newText);
      done();
    });
  });
});
