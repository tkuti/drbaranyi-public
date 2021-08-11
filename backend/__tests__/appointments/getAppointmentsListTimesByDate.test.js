const Appointment = require("../../models/Appointment")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer } = require('../util/inMemDb')
const { createJwtUserToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()

describe('GET ./api/appointments/listTimesByDate/:date endpoint testing ', () => {
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
                day: new Date("2021-07-01"),
                time: "13:00"
            }
        ])
    })


    afterAll(async () => {
        await stopServer(mongoServer)
    })


    it("Get endpoint without token responds with 401", async () => {
        const res = await request.get("/api/appointments/listTimesByDate/2021-07-01")

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });

    
    it("Get endpoint with proper token but non-existing date returns an empty array ", async () => {

        const res = await request.get("/api/appointments/listTimesByDate/2021-06-28")
            .set({ authorization: userToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);

    });

    it("Get endpoint with proper token returns the appointments ", async () => {

        const res = await request.get("/api/appointments/listTimesByDate/2021-07-01")
            .set({ authorization: userToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toBe("16:00");
        expect(res.body[1]).toBe("13:00");

    });

})

