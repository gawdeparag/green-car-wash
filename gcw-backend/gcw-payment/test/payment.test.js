const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');

chai.should();

chai.use(chaiHttp);

describe('Payment APIs', () => {
    describe("GET /payment", () => {
        it('Should GET all the payment details', (done) => {
            chai.request(server.app)
                .get("/payment/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                })
            done();
        })
        it('Should NOT GET all the payment details', (done) => {
            chai.request(server.app)
                .get("/payments/")
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        })
    });

    describe("POST /payment", () => {
        it('Should POST the payment details', (done) => {
            const paymentDetails = {
                userId: "U02",
                orderId: "60d08140d92d1f25647a1a1b",
                paymentOption: "Cash",
                totalAmount: 3000
            }
            chai.request(server.app)
                .post("/payment/")
                .send(paymentDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('userId');
                    response.body.should.have.property('orderId');
                    response.body.should.have.property('paymentOption');
                    response.body.should.have.property('totalAmount');
                })
            done();
        });
        it('Should NOT POST the payment details', (done) => {
            const paymentDetails = {
                userId: "U02",
                paymentOption: "Cash"
            }
            chai.request(server.app)
                .post("/payment/")
                .send(paymentDetails)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                })
        })
    });

    describe("PUT /payment/:id", () => {
        it('Should PUT the payment details', (done) => {
            const paymentDetailsId = "60d1a8110e010430d8b9df9d";
            const paymentDetails = {
                userId: "U02",
                orderId: "60d08140d92d1f25647a1a1b",
                totalAmount: 4000
            }
            chai.request(server.app)
                .put(`/payment/${paymentDetailsId}`)
                .send(paymentDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                })
            done();
        });
        it('Should NOT PUT the payment details', (done) => {
            const paymentDetailsId = "60d1a8110e010430d8b9df9d";
            const paymentDetails = {
                userId: "U02",
                orderId: "60d08140d92d1f25647a1a1b",
                totalAmount: 4000
            }
            chai.request(server.app)
                .put(`/payments/${paymentDetailsId}`)
                .send(paymentDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        });
    });

    describe("DELETE /payment/:id", () => {
        it('Should DELETE the payment details', (done) => {
            const paymentDetailsId = "60d1a8110e010430d8b9df9d";
            chai.request(server.app)
                .delete(`/payment/${paymentDetailsId}`)
                .end((err, response) => {
                    response.should.have.status(200);
                })
            done();
        });
        it('Should NOT DELETE the payment details', (done) => {
            const paymentDetailsId = "60d1a8110e010430d8b9df9d";
            chai.request(server.app)
                .delete(`/payments/${paymentDetailsId}`)
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        });
    });
})