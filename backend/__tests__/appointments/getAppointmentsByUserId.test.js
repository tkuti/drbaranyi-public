const Appointment = require("../../models/Appointment")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer } = require('../util/inMemDb')
const { createJwtUserToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()

describe('GET ./api/appointments/:userId endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
        await Appointment.insertMany([
            {
                userId: "123456789",
                userName: "Test User",
                email: "test@test.com",
                description: "Test Child vaccination",
                event: "vaccination",
                day: new Date("2021-07-01"),
                time: "16:00"
            },
            {
                userId: "123456789",
                userName: "Test User",
                email: "test@test.com",
                description: "Test Child generale",
                event: "generale",
                day: new Date("2021-07-02"),
                time: "12:00"
            },
            {
                userId: "987654321",
                userName: "Test User2",
                email: "test2@test.com",
                description: "Test Child2 vaccination",
                event: "vaccination",
                day: new Date("2021-07-03"),
                time: "13:00"
            }
        ])
    })


    afterAll(async () => {
        await stopServer(mongoServer)
    })


    it("Get endpoint without token responds with 401", async () => {
        const res = await request.get("/api/appointments/123456789")

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Get endpoint with proper token but different userId responds with 403", async () => {
        const res = await request.get("/api/appointments/987654321")
            .set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Eltérő user!");
    });


    it("Get endpoint with proper token returns the user's appointments ", async () => {

        const res = await request.get("/api/appointments/123456789")
            .set({ authorization: userToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].userId).toBe("123456789");
        expect(res.body[0].userName).toBe("Test User");
        expect(res.body[0].description).toBe("Test Child generale");
        expect(res.body[0].day).toBe("2021-07-02T00:00:00.000Z");
        expect(res.body[0].time).toBe("12:00");

    });

})

