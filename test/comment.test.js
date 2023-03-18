import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
chai.should();

//POST ROUTE____/api/comment/:id/
describe("POST /api/comment/:id", () => {
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

  it("should add a comment and return the commentID", async () => {
    const res = await chai
      .request(app)
      .post(`/api/comment/${postId}`)
      .send({
        comment: "Test comment",
      })
      .set("Authorization", `Bearer ${jwtToken}`);

    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("commentId");
  });

  it("should return a 500 error when an comment is not provided", async () => {
    const res = await chai
      .request(app)
      .post(`/api/comment/${postId}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    res.should.have.status(500);
    res.body.should.be.a("object");
    res.body.should.have.property("error");
  });
});
