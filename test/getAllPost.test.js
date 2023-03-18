import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
chai.should();

//GET ROUTE____/api/all_post//
describe("GET /api/all_post/", () => {
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

        chai
          .request(app)
          .post("/api/post")
          .set("Authorization", `Bearer ${jwtToken}`)
          .send({
            title: "Test Post Title",
            description: "Test Post Description",
          })
          .end((err, res) => {
            done();
          });
      });
  });

  it("should return a 401 status code when no authentication token is provided", async () => {
    const res = await chai.request(app).get(`/api/all_post/`);

    res.should.have.status(401);
  });

  it("should return the post object and a 200 status code when a valid post ID and authentication token is provided", async () => {
    const res = await chai
      .request(app)
      .get(`/api/all_post/`)
      .set("Authorization", `Bearer ${jwtToken}`);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("post");
  });
});
