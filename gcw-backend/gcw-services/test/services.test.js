const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');

chai.should();

chai.use(chaiHttp);

describe('AddOn APIs', () => {
    describe("GET /service", () => {
        it('Should GET all the service details', (done) => {
            chai.request(server)
                .get("/service/")
                .end((err, response) => {
                    response.should.have.status(200);
                })
            done();
        })
        it('Should NOT GET all the service details', (done) => {
            chai.request(server)
                .get("/services/")
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        })
    });

    describe("POST /service", () => {
        it('Should POST the service details', (done) => {
            const serviceDetails = {
                name: "Hyundai Gold",
                carId: "60da04aca0d2891228f12e8a",
                createdBy: "60d9fc939ae4ed208096d636",
                cost: 2000,
                isActive: true
            }
            chai.request(server)
                .post("/service/")
                .send(serviceDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                })
            done();
        });
        it('Should NOT POST the service details', (done) => {
            const serviceDetails = {
                name: "Hyundai Gold",
                carId: "60da04aca0d2891228f12e8a",
                isActive: true
            }
            chai.request(server)
                .post("/services/")
                .send(serviceDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    });

    describe("PUT /service/:id", () => {
        it('Should PUT the service details', (done) => {
            const serviceDetailsId = "60d1a8110e010430d8b9df9d";
            const serviceDetails = {
                name: "Hyundai Gold",
                carId: "60da04aca0d2891228f12e8a",
                isActive: true
            }
            chai.request(server)
                .put(`/service/${serviceDetailsId}`)
                .send(serviceDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                })
            done();
        });
        it('Should NOT PUT the service details', (done) => {
            const serviceDetailsId = "60d1a8110e010430d8b9df9d";
            const serviceDetails = {
                name: "Hyundai Gold",
                carId: "60da04aca0d2891228f12e8a",
                isActive: true
            }
            chai.request(server)
                .put(`/services/${serviceDetailsId}`)
                .send(serviceDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        });
    });

    describe("DELETE /service/:id", () => {
        it('Should DELETE the service details', (done) => {
            const serviceDetailsId = "60d1a8110e010430d8b9df9d";
            chai.request(server)
                .delete(`/service/${serviceDetailsId}`)
                .end((err, response) => {
                    response.should.have.status(200);
                })
            done();
        });
        it('Should NOT DELETE the service details', (done) => {
            const serviceDetailsId = "60d1a8110e010430d8b9df9d";
            chai.request(server)
                .delete(`/services/${serviceDetailsId}`)
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        });
    });
})