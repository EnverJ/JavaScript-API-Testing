import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
import { expect } from "chai";
const Token =
  "8d0e570e204d7180ab8fda52300efa4ea770d1eec00ee9f27e6976ef571c48f7";
describe("Users", () => {
  it("GET/USERS", (done) => {
    request.get(`users?access-token=${Token}`).end((err, res) => {
      console.log(err);
      console.log(res.body);
      console.log("test-----------------test");
      expect(res.body.data).not.to.be.empty;
      done(); // keep on waiting until it is done
    });
  });

  // or
  it("GET/USERS", () => {
    return request.get(`users?access-token=${Token}`).then((res) => {
      expect(res.body.data).to.not.be.empty;
    });
  });
  //// get specific user
  it("get/user/id", () => {
    return request.get(`users/5899542?access-token=${Token}`).then((res) => {
      expect(res.body.data.id).to.be.eq(5903297);
    });
  });

  it("get/user with query params", async () => {
    const url = `users?access-token=${Token}&page=5&gender=male&status=active`;
    return await request.get(url).then((res) => {
      expect(res.body.data).to.not.be.empty;
      res.body.data.forEach((data) => {
        expect(data.status).to.eq("active");
        expect(data.gender).to.eq("male");
      });
    });
  });
});
