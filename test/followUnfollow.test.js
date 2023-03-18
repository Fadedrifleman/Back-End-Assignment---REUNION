import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

//POST ROUTE_____/api/follow/:id/
describe("/api/follow/:id", () => {
  let jwtToken;
  const userIdToFollow = "6414405413fbf3fb8e01d0f9";
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

  it("should return a 401 status code if no JWT token is provided", async () => {
    const res = await chai.request(app).post(`/api/follow/${userIdToFollow}`);

    expect(res.status).to.equal(401);
  });

  it("should return a 200 status code and success message if a valid JWT token and user ID are provided", async () => {
    const res = await chai
      .request(app)
      .post(`/api/follow/${userIdToFollow}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
  });
});

//POST ROUTE_____/api/unfollow/:id/
describe("POST /api/unfollow/:id", () => {
  let jwtToken;
  const userIdToUnfollow = "6414405413fbf3fb8e01d0f9";
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

  it("should return a 401 status code if no token is provided", async () => {
    const res = await chai
      .request(app)
      .post(`/api/unfollow/${userIdToUnfollow}`);

    expect(res.status).to.equal(401);
  });

  it("should return a 200 status code if the user is successfully unfollowed", async () => {
    const res = await chai
      .request(app)
      .post(`/api/unfollow/${userIdToUnfollow}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
  });
});

