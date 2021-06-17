const chai = require('chai');
var request = require('supertest');
const userCars = require('../routers/userCars');

var should = chai.should();

describe("User's Cars API Testing", () => {
    it('Testing Get Request', () => {
        request(userCars).get('/user-cars').set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
    it('Testing Post Request', () => {
        let data = {
            name: "Tesla Model X",
            color: "Grey",
            brand: "Tesla",
            isServicedEarlier: false,
            lastServicingDate: "2021-06-16"
        }
        request(userCars).post('/user-cars', data).set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
    it('Testing Put Request', () => {
        let data = {
            isServicedEarlier: true,
            name: "Tesla Model X"
        }
        request(userCars).put('/user-cars/60cb184158aa8f3fd8e74008', data).set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
    it('Testing Delete Request', () => {
        request(userCars).delete('/user-cars/60cb1e9f327aa920603f6f1f').set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
});