import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
chai.should();

//POST ROUTE____/api/like/:id/
describe("POST /api/like/:id", () => {
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

  it("should like a post and return the updated post", async () => {
    const res = await chai
      .request(app)
      .post(`/api/like/${postId}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("likes");
  });

  it("should return a 500 error when an invalid post ID is provided", async () => {
    const res = await chai
      .request(app)
      .post(`/api/like/invalid-id`)
      .set("Authorization", `Bearer ${jwtToken}`);

    res.should.have.status(500);
    res.body.should.be.a("object");
    res.body.should.have.property("error");
  });
});

//POST ROUTE____/api/unlike/:id/
describe("POST /api/unlike/:id", () => {
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

            chai
              .request(app)
              .post(`/api/like/${postId}`)
              .set("Authorization", `Bearer ${jwtToken}`);
              done();
          });
      });
  });

  it("should unlike a post and return the updated post", async () => {
    const res = await chai
      .request(app)
      .post(`/api/unlike/${postId}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("likes");
  });

  it("should return a 500 error when an invalid post ID is provided", async () => {
    const res = await chai
      .request(app)
      .post(`/api/unlike/invalid-id`)
      .set("Authorization", `Bearer ${jwtToken}`);

    res.should.have.status(500);
    res.body.should.be.a("object");
    res.body.should.have.property("error");
  });
});
