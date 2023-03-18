import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
chai.should();

//POST ROUTE_____/api/post/
describe("POST /api/post", () => {
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
  it("should create a new post when valid data is provided", async () => {
    const post = {
      title: "Test Post",
      description: "This is a test post",
    };
    const res = await chai
      .request(app)
      .post("/api/post")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(post);
    res.should.have.status(201);
    res.body.should.be.an("object");
    res.body.should.have.property("postId");
    res.body.should.have.property("title").eq(post.title);
    res.body.should.have.property("description").eq(post.description);
    res.body.should.have.property("createdTime");
  });

  it("should return a 500 status code when title is not provided", async () => {
    const post = {
      description: "This is a test post",
    };
    const res = await chai
      .request(app)
      .post("/api/post")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(post);
    res.should.have.status(500);
  });
});
