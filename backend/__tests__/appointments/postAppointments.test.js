const Appointment = require("../../models/Appointment")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtUserToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()


describe('POST ./api/appointments endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })

    afterEach(async () => {
        await deleteAll([Appointment])
    })



    it("Post endpoint without token responds with 401", async () => {
        const res = await request.post("/api/appointments")
        .send(
            {
                userId: "123456789",
                userName: "Test User",
                email: "test@test.com",
                description: "Test Child vaccination",
                event: "vaccination",
                day: new Date("2021-07-01"),
                time: "16:00"
            }
        )

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Post endpoint with proper token but different userId responds with 403", async () => {
        const res = await request.post("/api/appointments")
        .send(
            {
                userId: "987654321",
                userName: "Test User",
                email: "test@test.com",
                description: "Test Child vaccination",
                event: "vaccination",
                day: new Date("2021-07-01"),
                time: "16:00"
            }
        ).set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Eltérő user!");
    });


    it("Post endpoint with proper token but different userName responds with 403", async () => {
        const res = await request.post("/api/appointments")
        .send(
            {
                userId: "123456789",
                userName: "Test User2",
                email: "test@test.com",
                description: "Test Child vaccination",
                event: "vaccination",
                day: new Date("2021-07-01"),
                time: "16:00"
            }
        ).set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Eltérő user!");
    });


    it("Post endpoint with proper token inserts the new appointment", async () => {

        const res = await request.post("/api/appointments")
        .send(
            {
                userId: "123456789",
                userName: "Test User",
                email: "test@test.com",
                description: "Test Child vaccination",
                event: "vaccination",
                day: new Date("2021-07-01"),
                time: "16:00"
            }
        ).set({ authorization: userToken })

        const count = await Appointment.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(count).toBe(1);

    })


    it("Post endpoint with missing body datas responds with 400", async () => {

        const res = await request.post("/api/appointments")
        .send(
            {
                userId: "123456789",
                userName: "Test User",
                email: "test@test.com",
                description: "Test Child vaccination",
                event: "",
                day: new Date("2021-07-01"),
                time: "16:00"
            }
        ).set({ authorization: userToken })

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Hiányzó adatok!");
    });
})



