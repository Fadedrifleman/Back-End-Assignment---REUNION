import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0MDZlMTNmYmYzZmI4ZTAxZDBmYiIsImlhdCI6MTY3OTE1Nzk5MH0.bmuv3o-GaOsaXunNCtFDcXJ5LmT8wYpV_8bhDnN5cio";

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

//POST ROUTE_____/api/follow/:id/
describe("/api/follow/:id", () => {
  const userIdToFollow = "6414405413fbf3fb8e01d0f9";

  it("should return a 401 status code if no JWT token is provided", async () => {
    const res = await chai.request(app).post(`/api/follow/${userIdToFollow}`);

    expect(res.status).to.equal(401);
  });

  it("should return a 200 status code and success message if a valid JWT token and user ID are provided", async () => {
    const res = await chai
      .request(app)
      .post(`/api/follow/${userIdToFollow}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
  });
});

//POST ROUTE_____/api/unfollow/:id/
describe("POST /api/unfollow/:id", () => {
  const userIdToUnfollow = "6414405413fbf3fb8e01d0f9";

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
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
  });
});

//GET ROUTE_____/api/user/
describe("GET /api/user", () => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  it("should return a 404 status code if no token is provided", async () => {
    const res = await chai.request(app).post('/api/user');

    expect(res.status).to.equal(404);
  });

  it("should authenticate the request and return the respective user profile", async () => {
    const res = await chai.request(app).get("/api/user").set(headers);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("userName");
    expect(res.body).to.have.property("followers");
    expect(res.body).to.have.property("following");
  });
});

//POST ROUTE_____/api/post/

//DELETE ROUTE____/api/post/:id/

//POST ROUTE____/api/like/:id/

//POST ROUTE____/api/unlike/:id/

//POST ROUTE____/api/comment/:id/

//GET ROUTE____/api/post/:id/

//GET ROUTE____/api/all_post/:id/
