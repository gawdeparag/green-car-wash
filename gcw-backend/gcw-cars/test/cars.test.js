const chai = require('chai');
var request = require('supertest');
const cars = require('../routers/cars');

var should = chai.should();

describe('Cars API Testing', () => {
    it('Testing Get Request', () => {
        request(cars).get('/cars').set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
    it('Testing Post Request', () => {
        let data = {
            name: "Tesla Model X",
            brand: "Tesla",
            model: "3",
            year: 2019
        }
        request(cars).post('/cars', data).set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
    it('Testing Put Request', () => {
        let data = {
            model: "X",
            year: 2020
        }
        request(cars).put('/cars/60cb184158aa8f3fd8e74008', data).set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
    it('Testing Delete Request', () => {
        request(cars).delete('/cars/60cb1e9f327aa920603f6f1f').set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
});