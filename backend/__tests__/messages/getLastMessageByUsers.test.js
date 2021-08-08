const Message = require("../../models/Message")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()
const adminToken = createJwtAdminToken()

describe('GET ./api/messages/lastMessageByUsers endpoint testing ', () => {
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
                type: "answer",
                userName: "Test User",
                date: new Date("2021-03-03"),
                message: "Test Answer1",
                creatorId: "999999999"
            },
            {
                userId: "987654321",
                type: "question",
                userName: "Test User2",
                date: new Date("2021-02-02"),
                message: "Test Question2",
                creatorId: "123456789"
            },
            {
                userId: "987654321",
                type: "answer",
                userName: "Test User2",
                date: new Date("2021-03-03"),
                message: "Test Answer2",
                creatorId: "999999999"
            },
        ])
    })


    afterAll(async () => {
        await stopServer(mongoServer)
    })


    it("Get endpoint without token responds with 401", async () => {
        const res = await request.get("/api/messages/lastMessageByUsers")

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    
    it("Get endpoint with user role token responds with 403", async () => {
        const res = await request.get("/api/messages/lastMessageByUsers")
        .set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Get endpoint with proper token returns the users' last  messages ", async () => {

        const res = await request.get("/api/messages/lastMessageByUsers").set({ authorization: adminToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0]._id).toBe("987654321");
        expect(res.body[0].userName).toBe("Test User2");
        expect(res.body[0].lastmessageType).toBe("answer");
        expect(res.body[0].newest).toBe("2021-03-03T00:00:00.000Z");

    });

})

