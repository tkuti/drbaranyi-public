const Message = require("../../models/Message")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtUserToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()


describe('POST ./api/messages/:userId endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })

    afterEach(async () => {
        await deleteAll([Message])
    })



    it("Post endpoint without token responds with 401", async () => {
        const res = await request.post("/api/messages/123456789").send(
            {
                userId: "123456789",
                type: "question",
                userName: "Test User",
                date: new Date("2021-01-01"),
                message: "Test Question1",
                creatorId: "123456789"
            }
        )

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Post endpoint with proper token but different userId responds with 403", async () => {
        const res = await request.post("/api/messages/111111111").send(
            {
                userId: "123456789",
                type: "question",
                userName: "Test User",
                date: new Date("2021-01-01"),
                message: "Test Question1",
                creatorId: "123456789"
            }
        ).set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Eltérő user!");
    });


    it("Post endpoint with proper token inserts the new message", async () => {

        const res = await request.post("/api/messages/123456789").send(
            {
                userId: "123456789",
                type: "question",
                userName: "Test User",
                date: new Date("2021-01-01"),
                message: "Test Question1",
                creatorId: "123456789"
            }
        ).set({ authorization: userToken })

        const count = await Message.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(count).toBe(1);

    })


    it("Post endpoint with missing body datas responds with 400", async () => {

        const res = await request.post("/api/messages/123456789").send(
            {
                userId: "123456789",
                type: "",
                userName: "",
                date: new Date("2021-01-01"),
                message: "Test Question1",
                creatorId: ""
            }
        ).set({ authorization: userToken })

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Hiányzó adatok!");
    });
})



