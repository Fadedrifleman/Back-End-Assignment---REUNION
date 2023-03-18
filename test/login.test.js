import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

//POST ROUTE_____/api/authenticate/
describe("/api/authenticate", () => {
    it("should return a JWT token and 200 status code when valid email and password are provided", (done) => {
      chai
        .request(app)
        .post("/api/authenticate")
        .send({ email: "test@gmail.com", password: "test123" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("jwtToken");
          done();
        });
    });
  
    it("should return a 401 status code when invalid email or password are provided", (done) => {
      chai
        .request(app)
        .post("/api/authenticate")
        .send({ email: "test@gmail.com", password: "invalid" })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });