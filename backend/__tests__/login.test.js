const User = require("../models/User")
const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('./util/inMemDb')
const jwt = require('jsonwebtoken')
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

describe('testing login endpoint', () => {
    let mongoServer
  
    beforeAll(async () => {
      mongoServer = await startServer()
      mock.onPost("https://oauth2.googleapis.com/token").reply(200, {
        id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBmY2MwMTRmMjI5MzRlNDc0ODBkYWYxMDdhMzQwYzIyYmQyNjJiNmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDYzODY1MzMyNjctdmZ0dTFqZzExOGxldG42NGFrZm51aHU1dWRzYjdyNXEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMDYzODY1MzMyNjctdmZ0dTFqZzExOGxldG42NGFrZm51aHU1dWRzYjdyNXEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA0NzU5MzQ3MTU0MjU1NTQwNzMiLCJlbWFpbCI6InR1bmRlLmt1dGlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ1azV6a0lEa3dPN2tGdndXMXh6bnlRIiwibmFtZSI6IlTDvG5kZSBLdXRpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoOHk2M0o3MllNaWtLMm01RmNVLUcwUXdLSktzU256dGkwVXh6OV9nPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlTDvG5kZSIsImZhbWlseV9uYW1lIjoiS3V0aSIsImxvY2FsZSI6Imh1IiwiaWF0IjoxNjI4MTYzMzE5LCJleHAiOjE2MjgxNjY5MTl9.yQbMpfFOGa86b-3QvVEGeyp3KoFQvvQXoMkGOJAMdqvOHSAwgwy-6qBcK9xoD8nM6uRna0JsM8XI2FRALmRpHgUl3xjVNdrM0CsiUQsLQkdeclxTxja4AJdGe_QG1Cnu-ia3kB0OhOd3A0KZ-XdqVnX4WMK-sxcEdrCS0iiQYw1knT91mHbhyi4SAglDUK81vaayyqb4WuLBXhNo9hsLEnzrtZLGQb5JF2N6Ej0ZYQmQ4NpH2WWzT6HZZPz-sSQEVXrAQot2_jdESaE0jZRQc4DB3FGN8XBSLmKgjjNSDgQ80s1OD720GZcF9O2aO_KycdU-8xc6p4tj_GSCj4uuTw"
    });
    })
  
    afterAll(async () => {
      await stopServer(mongoServer)
    })
  
    afterEach(async () => {
      await deleteAll([User])
    })
  
  
    it("Login endpoint with empty database creates the new user", async () => {
  
        const res = await request.post("/api/login").send({code: "testCode"});

        const newUserInDb = await User.findOne()

        const userInToken = jwt.decode(res.body.authorization)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("authorization")

        expect(newUserInDb.name).toBe(userInToken.name)
        expect(newUserInDb.email).toBe(userInToken.email)
        expect(newUserInDb.userId).toBe(userInToken.userId)
        expect(newUserInDb.role).toBe(userInToken.role)

    });

    it("Login endpoint with existing user does not create the user again", async () => {
        await new User({
            name: "Tünde Kuti",
            email: "tunde.kuti@gmail.com",
            userId: "100475934715425554073",
            role: "user"
        }).save()

        const countBefore = await User.countDocuments()
  
        const res = await request.post("/api/login").send({code: "testCode"});
        
        const countAfter = await User.countDocuments()
        
        const userInDb = await User.findOne()
        const userInToken = jwt.decode(res.body.authorization)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("authorization")

        expect(userInDb.name).toBe(userInToken.name)
        expect(userInDb.email).toBe(userInToken.email)
        expect(userInDb.userId).toBe(userInToken.userId)
        expect(userInDb.role).toBe(userInToken.role)
        expect(countBefore).toBe(countAfter)

    });
  
  
  })
  