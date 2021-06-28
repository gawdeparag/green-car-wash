const chai = require('chai');
var request = require('supertest');
const order = require('../routers/order');

var should = chai.should();

describe('Cars API Testing', () => {
    it('Testing Get Request', () => {
        request(order).get('/order').set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
    it('Testing Post Request', () => {
        let data = {
            carName: "Volkwagen Beetle",
            carBrand: "Volkwagen",
            serviceName: "VW Silver",
            serviceCost: 1500,
            isDone: false,
            totalCost: 2000,
            createdBy: "60d8b878e19d41299450ba6b",
            bookedDate: "2021-06-28T17:24:36.071Z"
        }
        request(order).post('/order', data).set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
    it('Testing Put Request', () => {
        let data = {
            serviceName: "Volkwagen Silver",
            totalCost: 1500
        }
        request(order).put('/order/60d084c5df3b480350decdd9', data).set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
    it('Testing Delete Request', () => {
        request(order).delete('/order/60d084c5df3b480350decdd9').set('accept', 'application/json')
            .expect('Content-Type', /json/).expect(200);
    });
});