const Appointment = require("../../models/Appointment")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer } = require('../util/inMemDb')
const { createJwtUserToken, createJwtAdminToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()
const adminToken = createJwtAdminToken()

describe('GET ./api/appointments/byInterval/:startDate/:endDate endpoint testing ', () => {
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
                day: new Date("2021-07-05"),
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
        const res = await request.get("/api/appointments/byInterval/2021-06-30/2021-07-03")

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });



    it("Get endpoint with user role token responds with 403", async () => {
        const res = await request.get("/api/appointments/byInterval/2021-06-30/2021-07-03")
            .set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Get endpoint with proper admin role token but non-existing date interval returns an empty array ", async () => {

        const res = await request.get("/api/appointments/byInterval/2021-06-28/2021-06-30")
            .set({ authorization: adminToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);

    });


    it("Get endpoint with proper admin role token returns the appointments ", async () => {

        const res = await request.get("/api/appointments/byInterval/2021-06-30/2021-07-03")
            .set({ authorization: adminToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[1].userId).toBe("987654321");
        expect(res.body[1].userName).toBe("Test User2");
        expect(res.body[1].description).toBe("Test Child2 vaccination");
        expect(res.body[1].day).toBe("2021-07-03T00:00:00.000Z");
        expect(res.body[1].time).toBe("13:00");

    });

})

