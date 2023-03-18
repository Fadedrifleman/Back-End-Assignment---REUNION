import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

//DELETE ROUTE____/api/post/:id/
describe("DELETE /api/post/:id", () => {
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

  it("should return a 401 status code when no authentication token is provided", (done) => {
    chai
      .request(app)
      .delete(`/api/post/${postId}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it("should return a 404 status code when an invalid post ID is provided", (done) => {
    chai
      .request(app)
      .delete("/api/post/1234")
      .set("Authorization", `Bearer ${jwtToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should delete the post and return a 200 status code when a valid post ID is provided", (done) => {
    chai
      .request(app)
      .delete(`/api/post/${postId}`)
      .set("Authorization", `Bearer ${jwtToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.title).to.equal("Test Post Title");
        expect(res.body.description).to.equal("Test Post Description");
        done();
      });
  });
});
