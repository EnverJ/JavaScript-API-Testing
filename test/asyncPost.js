import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
import { expect } from "chai";
const token = process.env.USER_TOKEN;

describe("User post", async () => {
  let postId;
  it("Post/user", async () => {
    const data = {
      email: `user-${Math.floor(Math.random() * 99999)}@example.com`,
      name: "Joe Doe",
      gender: "male",
      status: "active",
    };
    const res = await request
      .post("users")
      .set("Authorization", `${token}`)
      .send(data)
      .then(async (res) => {
        expect(res.body.data).to.deep.include(data);
        postId = res.body.data.id;
      });
  });
  it("get user by id", async () => {
    const res = await request
      .get(`users/${postId}`)
      .set("Authorization", `${token}`)
      .expect(200);
    console.log(res.body);
  });
});
