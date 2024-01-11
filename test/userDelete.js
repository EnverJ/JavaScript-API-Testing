import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
import { expect } from "chai";
const token =
  "Bearer 8d0e570e204d7180ab8fda52300efa4ea770d1eec00ee9f27e6976ef571c48f7";

describe("Delete users", () => {
  let userId;
  it("Post/user", () => {
    const data = {
      email: `user-${Math.floor(Math.random() * 99999)}@example.com`,
      name: "Joe Doe",
      gender: "male",
      status: "active",
    };
    return request
      .post("users")
      .set("Authorization", `${token}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        // data.email = "rerere@gdgdg.com";  testing purpose  negative scenario

        //  expect(res.body.data.email).to.eq(data.email); or
        expect(res.body.data).to.deep.include(data);
        userId = res.body.data.id;
      });
  });
  it("user/get", () => {
    return request.get(`users/${userId}`);
    set("Authorization", `${token}`).then((res) => {
      expect(res.body.data).to.not.be.empty;
      console.log("get call", res.body);
      expect(res.body.data.id).to.be.eq(`${userId}`);
    });
  });

  it("user/delete", () => {
    return request
      .delete(`users/${userId}`)
      .set("Authorization", `${token}`)
      .then((res) => {
        expect(res.body.data).to.be.eq(null);
      });
  });
});
