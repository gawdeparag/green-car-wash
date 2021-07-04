const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');

chai.should();

chai.use(chaiHttp);

describe('User APIs', () => {
    describe("Signup APIs for Customer", () => {
        it('Should Signup a customer', (done) => {
            const newUser = {
                name: "Clive Grant",
                email: "clive@grant.com",
                userName: "cliveGrant",
                password: "pass123",
                confirmPassword: "pass123",
                userType: "User"
            };
            chai.request(server)
                .post("/signup")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                })
            done();
        });
        it('Should NOT Signup a customer', (done) => {
            const newUser = {
                name: "Clive Grant",
                email: "clive@grant.com",
                userName: "cliveGrant",
                password: "pass123",
                confirmPassword: "pass123",
                userType: "User"
            };
            chai.request(server)
                .post("/user-signup")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });
    describe("Login APIs for Customer", () => {
        it('Should Login a customer', (done) => {
            const newUser = {
                email: "clive@grant.com",
                password: "pass123",
                userType: "User"
            };
            chai.request(server)
                .post("/login")
                .send(newUser)
                .end((err, response) => {
                    response.body.should.be.a('object');
                });
            done();
        });
        it('Should NOT Login a customer', (done) => {
            const newUser = {
                email: "clive@grant.com",
                password: "pass123"
            };
            chai.request(server)
                .post("/user-login")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });
});

describe('Admin APIs', () => {
    describe("Signup APIs for Admin", () => {
        it('Should Signup an Admin', (done) => {
            const newUser = {
                name: "Conway Rees",
                email: "conway@rees.com",
                userName: "conwayR",
                password: "pass123",
                confirmPassword: "pass123",
                userType: "Admin"
            };
            chai.request(server)
                .post("/admin/signup")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                })
            done();
        });
        it('Should NOT Signup a admin', (done) => {
            const newUser = {
                name: "Conway Rees",
                email: "conway@rees.com",
                userName: "conwayR",
                password: "pass123",
                confirmPassword: "pass123",
                userType: "ADmin"
            };
            chai.request(server)
                .post("/admin-signup")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });
    describe("Login APIs for admin", () => {
        it('Should Login an admin', (done) => {
            const newUser = {
                email: "conway@rees.com",
                password: "pass123",
                userType: "Admin"
            };
            chai.request(server)
                .post("/admin/login")
                .send(newUser)
                .end((err, response) => {
                    response.body.should.be.a('object');
                });
            done();
        });
        it('Should NOT Login an admin', (done) => {
            const newUser = {
                email: "clive@grant.com",
                password: "pass123"
            };
            chai.request(server)
                .post("/admin-login")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });
});

describe('Washer APIs', () => {
    describe("Signup APIs for Washer", () => {
        it('Should Signup an Washer', (done) => {
            const newUser = {
                name: "Dermot Cox",
                email: "dermot@cox.com",
                userName: "dermotCox",
                password: "pass123",
                confirmPassword: "pass123",
                userType: "Washer"
            };
            chai.request(server)
                .post("/washer/signup")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                })
            done();
        });
        it('Should NOT Signup a washer', (done) => {
            const newUser = {
                name: "Dermot Cox",
                email: "dermot@cox.com",
                userName: "dermotCox",
                password: "pass123",
                confirmPassword: "pass123",
                userType: "WAsher"
            };
            chai.request(server)
                .post("/washer-signup")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });
    describe("Login APIs for Washer", () => {
        it('Should Login an Washer', (done) => {
            const newUser = {
                email: "dermot@cox.com",
                password: "pass123",
                userType: "Washer"
            };
            chai.request(server)
                .post("/washer/login")
                .send(newUser)
                .end((err, response) => {
                    response.body.should.be.a('object');
                });
            done();
        });
        it('Should NOT Login an washer', (done) => {
            const newUser = {
                email: "dermot@cox.com",
                password: "pass123",
            };
            chai.request(server)
                .post("/washer-login")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });
});

describe('API for GETting all washer details', () => {
    it('Should GET all the washer details', (done) => {
        chai.request(server)
            .get("/all-washers/")
            .end((err, response) => {
                response.should.have.status(200);
            })
        done();
    });
    it('Should NOT GET all the washer details', (done) => {
        chai.request(server)
            .get("/all-washer/")
            .end((err, response) => {
                response.should.have.status(404);
            })
        done();
    });
});

describe('API for GETting all users details', () => {
    it('Should GET all the users details', (done) => {
        chai.request(server)
            .get("/all-users/")
            .end((err, response) => {
                response.should.have.status(200);
            })
        done();
    });
    it('Should NOT GET all the washer details', (done) => {
        chai.request(server)
            .get("/all-user/")
            .end((err, response) => {
                response.should.have.status(404);
            })
        done();
    });
});

describe('API for Logging out', () => {
    it('Should logout', (done) => {
        chai.request(server)
            .get("/logout/")
            .end((err, response) => {
                response.should.have.status(200);
            })
        done();
    });
    it('Should NOT logout', (done) => {
        chai.request(server)
            .get("/log-out/")
            .end((err, response) => {
                response.should.have.status(404);
            })
        done();
    });
});