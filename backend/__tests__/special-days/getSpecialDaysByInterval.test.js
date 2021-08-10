const SpecialDay = require("../../models/SpecialDay")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer } = require('../util/inMemDb')
const { createJwtUserToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()

describe('GET ./api/special-days/:startDate/:endDate endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
        await SpecialDay.insertMany([
           {
             day: "2021-06-12T00:00:00.000Z",
             newDay: "Hétfő",
             type: "active"
           },
           {
             day: "2021-06-15T00:00:00.000Z",
             newDay: "Kedd",
             type: "inactive"
           },
           {
             day: "2021-06-16T00:00:00.000Z",
             newDay: "Szerda",
             type: "active"
           }
        ])
    })


    afterAll(async () => {
        await stopServer(mongoServer)
    })


    it("Get endpoint without token responds with 401", async () => {
        const res = await request.get("/api/special-days/2021-06-12/2021-06-15")

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Get endpoint with proper token but non-existing date interval returns an empty array ", async () => {

        const res = await request.get("/api/special-days/2021-06-30/2021-07-02")
        .set({ authorization: userToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);

    });

    it("Get endpoint with proper token returns the special day document ", async () => {

        const res = await request.get("/api/special-days/2021-06-12/2021-06-15")
        .set({ authorization: userToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].day).toBe("2021-06-12T00:00:00.000Z");
        expect(res.body[1].day).toBe("2021-06-15T00:00:00.000Z");

    });

})

