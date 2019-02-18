const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const expect = require('chai').expect;

//  testsuite
describe('Testing to register a user', function()
{
  //  testcase
  it('Should handle a request to register a user', function(done)
  {
    // Response body should have a key as userInfo which will hold 'username' value
    // status code = 201
    // response body will hold user.userName

    request(app)
    .post(`/api/v1/users/register`)
    .send(config.USER_1)
    .expect(201)
    .then((response)=>{
      expect(response.body).to.have.property('userInfo');
      expect(response.body.userInfo).to.equal(config.USER_ID_1);
      done();
    });

  });

  //  testcase
  it('Should handle a request to register a user multiple times with same username', function(done)
  {
    //Response body should have a key as message which will hold value as 'username is already exist'
    // status code = 403
    // response body will hold an object with message key
    request(app)
    .post(`/api/v1/users/register`)
    .send(config.USER_1)
    .expect(403)
    .then((response)=>{
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('username is already exist');
      done();
    });
  });
});

//  testsuite
describe('Testing to login user', function()
{
  //  testcase
  it('Should handle a request to successfully login', function(done)
  {
    //Response body should have a key as user which will hold userName as a key and it will hold username value
    // status code = 200
    // response body will hold user.userName
    request(app)
    .post(`/api/v1/users/login`)
    .send(config.USER_1)
    .expect(200)
    .then((response)=>{
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('userName');
      expect(response.body.user.userName).to.equal(config.USER_1.username);
      done();
    });
  });

  //  testcase
  it('Should handle a request to login with wrong password', function(done)
  {
   //Response body should have a key as message which will hold value as 'Password is incorrect'
   // status code = 403
   // response body will hold an object with message key
   config.USER_1.password = 'newPassword';
   request(app)
   .post(`/api/v1/users/login`)
   .send(config.USER_1)
   .expect(403)
   .then((response)=>{
     expect(response.body).to.have.property('message');
     expect(response.body.message).to.equal('Password is incorrect');
     done();
  });
});
  //  testcase
  it('Should handle a request to login with wrong username', function(done)
  {
    //Response body should have a key as message which will hold value as 'You are not registered user'
    // status code = 403
    // response body will hold an object with message key
    request(app)
   .post(`/api/v1/users/login`)
   .send(config.USER_2)
   .expect(403)
   .then((response)=>{
     expect(response.body).to.have.property('message');
     expect(response.body.message).to.equal('You are not registered user');
     done();
  });
});
});