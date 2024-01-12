import request from "../config/common.js";
import { faker } from "@faker-js/faker";
import "dotenv/config";
import { expect } from "chai";
const token = process.env.USER_TOKEN;
const statuses = ["active", "inactive"];

describe("post call", () => {
  it("Post/user", async () => {
    const data = {
      //  email: `user-${Math.floor(Math.random() * 99999)}@example.com`,
      email: faker.internet.email(),
      name: faker.person.fullName(),
      gender: faker.person.sex(),
      status: faker.helpers.arrayElement(statuses),
    };
    return await request
      .post("users")
      .set("Authorization", `${token}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        // data.email = "rerere@gdgdg.com";  testing purpose  negative scenario

        //  expect(res.body.data.email).to.eq(data.email); or
        expect(res.body.data).to.deep.include(data);
      });
  });

  it("put/user", () => {
    const data = {
      //  name: `Larry-${Math.floor(Math.random() * 99999)}`,
      name: faker.person.fullName(),
      status: "active",
    };
    return request
      .put("users/5903315")
      .set("Authorization", `${token}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        expect(res.body.data).to.deep.include(data);
      });
  });
});

describe("Negative tests", () => {
  it("410 Authentication Failed", async () => {
    const data = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      gender: faker.person.sex(),
      status: faker.helpers.arrayElement(statuses),
    };
    return (
      request
        .post("users")
        //   .set("Authorization", `${token}`)
        .send(data)
        .then((res) => {
          console.log(res.body);

          console.log(res.body);
          expect(res.body.code).to.eq(401);
          expect(res.body.data.message).to.eq("Authentication failed");
        })
    );
  });

  it("422 validation Failed", async () => {
    const data = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    };
    return request
      .post("users")
      .set("Authorization", `${token}`)
      .send(data)
      .then((res) => {
        console.log(res.body);

        console.log(res.body);
        expect(res.body.code).to.eq(422);
        expect(res.body.data[0].field).to.eq("gender");
        expect(res.body.data[0].message).to.eq(
          "can't be blank, can be male of female"
        );
        expect(res.body.data[1].field).to.eq("status");
        expect(res.body.data[1].message).to.eq("can't be blank");
      });
  });
});
