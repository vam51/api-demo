let server = require('../app');
let chai = require('chai');
let request = require('supertest');
//let chaiHttp = require('chai-http');
let assert = chai.assert;
let should = chai.should();
let jest = require('jest-mock');
let dbHelper = require('./../api/helpers/DataBaseHelper');
//chai.use(chaiHttp);

describe('controllers', function() {

  describe('phone-number-controller', function() {

    describe('GET /api-demo/v1/phonenumbers', function() {

      it('Return all the data when no query param', function(done) {
        request(server)
          .get('/api-demo/v1/phonenumbers')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            assert.typeOf(res.body,'array');
            assert.lengthOf(res.body,7);
            done();
          });
      });

      it('Return filtered list when query with customerId', function(done) {

        request(server)
          .get('/api-demo/v1/phonenumbers')
          .query({ customerId: 'C2'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            assert.typeOf(res.body,'array');
            assert.lengthOf(res.body,2);
            done();
          });
      });
    });
    
    describe('POST /api-demo/v1/phonenumbers/{phonenumber}/activate', function() {

      it('Sucesfully activate a phone number', function(done) {

        request(server)
          .post('/api-demo/v1/phonenumbers/0400000011/activate')
          .set('Accept', 'application/octet-stream')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.have.property('message');
            done();
          });
      });
      it('Number does not exist', function(done) {

        request(server)
          .post('/api-demo/v1/phonenumbers/0400000010/activate')
          .set('Accept', 'application/octet-stream')
          .expect('Content-Type', /json/)
          .expect(400)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.have.property('errorMessage').eql("Number not found");

            done();
          });
      });
    });
    describe('Testing error scenarios', function() {
      let spyFindByCustomer;
      let spyFindByPhoneNumber;
      this.beforeAll(() => {
        spyFindByPhoneNumber = jest.spyOn(dbHelper,'findByPhoneNumber').mockImplementationOnce(()=>Promise.reject(new Error('Database Error')));
        spyFindByCustomer = jest.spyOn(dbHelper,'findByCustomerId').mockImplementationOnce(()=>Promise.reject(new Error('Database Error')));
      });
      it('Error while fetching the phone numbers', function(done) {
        request(server)
          .get('/api-demo/v1/phonenumbers')
          .query({ customerId: 'C2'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.have.property('errorCode').eql("503");
            res.body.should.have.property('errorMessage').eql("Error while fetching the phone numbers");
            done();
          });
      });
      it('Error fetching the phone number during update', function(done) {
        request(server)
          .post('/api-demo/v1/phonenumbers/0400000010/activate')
          .set('Accept', 'application/octet-stream')
          .expect('Content-Type', /json/)
          .expect(500)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.have.property('errorCode').eql("501");
            res.body.should.have.property('errorMessage').eql("Error while fetching the phone number");
            done();
          });
      });
      this.afterAll(()=>{
        spyFindByCustomer.mockRestore();
        spyFindByPhoneNumber.mockRestore();
      });
    });

    describe('Testing error scenarios for status update', function() {
      let spySave;
      this.beforeAll(() => {
        spySave = jest.spyOn(dbHelper,'save').mockImplementationOnce(()=>Promise.reject(new Error('Database Error')));
      });
      it('Error while updating the status', function(done) {
        request(server)
          .post('/api-demo/v1/phonenumbers/0400000011/activate')
          .set('Accept', 'application/octet-stream')
          .expect('Content-Type', /json/)
          .expect(500)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.have.property('errorCode').eql("502");
            res.body.should.have.property('errorMessage').eql("Error while updating the status");
            done();
          });
      });
    });
  });
});
