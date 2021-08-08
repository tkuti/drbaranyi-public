const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)
const jwt = require('jsonwebtoken')
const { createJwtUserToken } = require('./util/createJwtToken')

const userToken = createJwtUserToken()

describe('testing token endpoint', () => {

  
    it("Token GET endpoint without token responds with 401", async () => {
  
        const res = await request.get("/api/token")

        expect(res.status).toBe(401)
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!")

    });


    it("Token GET endpoint with wrong token responds with 401", async () => {
  
        const res = await request.get("/api/token").set({ authorization: "randomString" })

        expect(res.status).toBe(401)
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!")

    });


    it("Token GET endpoint with proper token responds with 200 and returns the user", async () => {
  
        const res = await request.get("/api/token").set({ authorization: userToken })

        expect(res.status).toBe(200)
        expect(res.body.userId).toBe("123456789")
        expect(res.body.email).toBe("teszt@teszt.hu")
        expect(res.body.name).toBe("Test User")
        expect(res.body.role).toBe("user")

    });
     
  
  })