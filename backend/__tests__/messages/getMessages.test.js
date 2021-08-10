const Message = require("../../models/Message")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer } = require('../util/inMemDb')
const { createJwtUserToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()

describe('GET ./api/messages/byuser/:userId endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
        await Message.insertMany([
            {
                userId: "123456789",
                type: "question",
                userName: "Test User",
                date: new Date("2021-01-01"),
                message: "Test Question1",
                creatorId: "123456789"
            },
            {
                userId: "123456789",
                type: "question",
                userName: "Test User",
                date: new Date(),
                message: "Test Question2",
                creatorId: "123456789"
            },
        ])
    })


    afterAll(async () => {
        await stopServer(mongoServer)
    })


    it("Get endpoint without token responds with 401", async () => {
        const res = await request.get("/api/messages/byuser/111111111")

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Get endpoint with proper token but different userId responds with 403", async () => {
        const res = await request.get("/api/messages/byuser/111111111").set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Eltérő user!");
    });


    it("Get endpoint with proper token returns the user's messages ", async () => {

        const res = await request.get("/api/messages/byuser/123456789").set({ authorization: userToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].message).toBe("Test Question2");

    });

})

