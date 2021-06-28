const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');

chai.should();

chai.use(chaiHttp);

describe('AddOn APIs', () => {
    describe("GET /add-on", () => {
        it('Should GET all the addOn details', (done) => {
            chai.request(server.app)
                .get("/add-on/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                })
            done();
        })
        it('Should NOT GET all the addOn details', (done) => {
            chai.request(server.app)
                .get("/add-ons/")
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        })
    });

    describe("POST /add-on", () => {
        it('Should POST the addOn details', (done) => {
            const addOnDetails = {
                name: "Teflon Coating",
                serviceId: "S01",
                carId: "60d98ffa33b0f82d64713b71",
                cost: 500,
                createdBy: "60d9fc939ae4ed208096d636",
                isActive: true
            }
            chai.request(server.app)
                .post("/add-on/")
                .send(addOnDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('userId');
                    response.body.should.have.property('orderId');
                    response.body.should.have.property('addOnOption');
                    response.body.should.have.property('totalAmount');
                })
            done();
        });
        it('Should NOT POST the addOn details', (done) => {
            const addOnDetails = {
                serviceId: "S02",
                cost: 500,
            }
            chai.request(server.app)
                .post("/add-on/")
                .send(addOnDetails)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                })
        })
    });

    describe("PUT /add-on/:id", () => {
        it('Should PUT the addOn details', (done) => {
            const addOnDetailsId = "60d1a8110e010430d8b9df9d";
            const addOnDetails = {
                serviceId: "S02",
                cost: 500,
            }
            chai.request(server.app)
                .put(`/add-on/${addOnDetailsId}`)
                .send(addOnDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                })
            done();
        });
        it('Should NOT PUT the addOn details', (done) => {
            const addOnDetailsId = "60d1a8110e010430d8b9df9d";
            const addOnDetails = {
                serviceId: "S02",
                cost: 500
            }
            chai.request(server.app)
                .put(`/add-ons/${addOnDetailsId}`)
                .send(addOnDetails)
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        });
    });

    describe("DELETE /add-on/:id", () => {
        it('Should DELETE the addOn details', (done) => {
            const addOnDetailsId = "60d1a8110e010430d8b9df9d";
            chai.request(server.app)
                .delete(`/add-on/${addOnDetailsId}`)
                .end((err, response) => {
                    response.should.have.status(200);
                })
            done();
        });
        it('Should NOT DELETE the addOn details', (done) => {
            const addOnDetailsId = "60d1a8110e010430d8b9df9d";
            chai.request(server.app)
                .delete(`/add-ons/${addOnDetailsId}`)
                .end((err, response) => {
                    response.should.have.status(404);
                })
            done();
        });
    });
})