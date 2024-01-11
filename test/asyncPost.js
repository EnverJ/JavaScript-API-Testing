import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
import { expect } from "chai";
const token =
  "Bearer 8d0e570e204d7180ab8fda52300efa4ea770d1eec00ee9f27e6976ef571c48f7";

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
