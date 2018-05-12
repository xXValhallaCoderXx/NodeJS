const request = require("supertest");
const expect = require("expect");
const { ObjectID } = require("mongodb");

const { User } = require("./model");
const { app } = require("../index");

const { users, populateUsers, todos } = require("../utils/seed-db");

beforeEach(populateUsers);
//beforeEach(populateTodos);

describe("GET /api/users/me", () => {
  it("should return user if authenticated", done => {
    request(app)
      .get("/api/users/me")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it("should return 401 if not authenticated", done => {
    request(app)
      .get("/api/users/me")
      .expect(401)
      .expect(res => {
        expect(res.body.data).toEqual("Auth is required");
      })
      .end(done);
  });
});

describe("POST /api/users", () => {
  it("should create a user", done => {
    var email = "example@example.com";
    var password = "123mnb";

    request(app)
      .post("/api/users")
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.headers["x-auth"]).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        User.findOne({ email })
          .then(user => {
            expect(user).toBeTruthy();
            //expect(user.password).toNotEqual(password);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should return validation errors if invalid", done => {
    var email = "example";
    var password = "123";

    request(app)
      .post("/api/users")
      .send({ email, password })
      .expect(400)
      .end(done);
  });

  it("should not create user if email in use", done => {
    var email = "test_user@email.com";
    var password = "userTwoPassword";

    request(app)
      .post("/api/users")
      .send({ email, password })
      .expect(400)
      .end(done);
  });
});

describe("POST /api/users/login", () => {
  it("should login user and return auth token", done => {
    request(app)
      .post("/api/users/login")
      .send({ email: users[1].email, password: users[1].password })
      .expect(200)
      .expect(res => {
        expect(res.headers["x-auth"]).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens[1]).toMatchObject({
              access: "auth",
              token: res.headers["x-auth"]
            });
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should reject invalid logins", done => {
    let email = "nate@test.com";
    let password = "notreal";
    request(app)
      .post("/api/users/login")
      .send({ email, password })
      .expect(400)
      .expect(res => {
        expect(res.headers["x-auth"]).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens.length).toBe(1);
            done();
          })
          .catch(e => done(e));
      });
  });
});

// describe("POST /api/users/login", () => {
//   it("should delete a users token", done => {
//     request(app)
//       .delete("/api/users/me/token")
//       .set("x-auth", users[0].tokens[0].token)
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         User.findById(users[1]._id)
//           .then(user => {
//             expect(user.tokens.length).toBe(0);
//             done();
//           })
//           .catch(e => done(e));
//       });
//   });
// });
