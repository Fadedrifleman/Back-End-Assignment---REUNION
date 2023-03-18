import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

//GET ROUTE_____/api/user/
describe("GET /api/user", () => {
  let jwtToken;
  before((done) => {
    chai
      .request(app)
      .post("/api/authenticate")
      .send({
        email: "test@gmail.com",
        password: "test123",
      })
      .end((err, res) => {
        jwtToken = res.body.jwtToken;
        done();
      });
  });

  it("should return a 404 status code if no token is provided", async () => {
    const res = await chai.request(app).post("/api/user");

    expect(res.status).to.equal(404);
  });

  it("should return the respective user profile and 200 status code", async () => {
    const res = await chai.request(app).get("/api/user").set("Authorization", `Bearer ${jwtToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("userName");
    expect(res.body).to.have.property("followers");
    expect(res.body).to.have.property("following");
  });
});
