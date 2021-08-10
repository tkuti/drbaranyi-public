const User = require("../../models/User")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer } = require('../util/inMemDb')
const { createJwtUserToken, createJwtAdminToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()
const adminToken = createJwtAdminToken()

describe('GET ./api/users endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
        await User.insertMany([
            {
                userId: "123456789",
                name: "Test User1",
                email: "test1@test.hu",
                role: "user"
            },
            {
                userId: "987654321",
                name: "Test User2",
                email: "test2@test.hu",
                role: "user"
            },
        ])
    })


    afterAll(async () => {
        await stopServer(mongoServer)
    })


    it("Get endpoint without token responds with 401", async () => {
        const res = await request.get("/api/users")

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Get endpoint with user role token responds with 403", async () => {
        const res = await request.get("/api/users")
        .set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!")
    });


    it("Get endpoint with proper admin role token returns the users", async () => {

        const res = await request.get("/api/users")
        .set({ authorization: adminToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[1].name).toBe("Test User2");

    });

})

