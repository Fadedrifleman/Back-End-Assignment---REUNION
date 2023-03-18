import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
chai.should();

//GET ROUTE____/api/post/:id/
describe("GET /api/post/:id", () => {
  let jwtToken;
  let postId;

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
            postId = res.body.postId;
            done();
          });
      });
  });

  it("should return a 401 status code when no authentication token is provided", async () => {
    const res = await chai.request(app).get(`/api/post/${postId}`);

    res.should.have.status(401);
  });

  it("should return the post object and a 200 status code when a valid post ID and authentication token is provided", async () => {
    const res = await chai
      .request(app)
      .get(`/api/post/${postId}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("_id");
    res.body.should.have.property("title");
    res.body.should.have.property("description");
    res.body.should.have.property("likes");
    res.body.should.have.property("comment");
  });
});
