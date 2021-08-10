const SpecialDay = require("../../models/SpecialDay")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtUserToken, createJwtAdminToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()
const adminToken = createJwtAdminToken()

describe('POST ./api/special-days endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
    })

    beforeEach(async () => {
        await SpecialDay.insertMany([
            {
                day: "2021-06-12T00:00:00.000Z",
                newDay: "Hétfő",
                type: "active"
            }
        ])
    })

    afterEach(async () => {
        await deleteAll([SpecialDay])
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })


    it("Post endpoint without token responds with 401", async () => {
        const res = await request.post("/api/special-days")
            .send(
                {
                    day: "2021-06-13T00:00:00.000Z",
                    newDay: "Kedd",
                    type: "active"
                }
            )

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Post endpoint with user role token responds with 403", async () => {
        const res = await request.post("/api/special-days")
            .send(
                {
                    day: "2021-06-13T00:00:00.000Z",
                    newDay: "Kedd",
                    type: "active"
                }
            ).set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Post endpoint with proper admin role token inserts the new special day if not exist already", async () => {

        const res = await request.post("/api/special-days")
            .send(
                {
                    day: "2021-06-13T00:00:00.000Z",
                    newDay: "Kedd",
                    type: "active"
                }
            )
            .set({ authorization: adminToken })

        const count = await SpecialDay.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(count).toBe(2);

    });

    it("Post endpoint with proper admin role token update the existing special day", async () => {

        const res = await request.post("/api/special-days")
            .send(
                {
                    day: "2021-06-12T00:00:00.000Z",
                    newDay: "Csütörtök",
                    type: "active"
                }
            )
            .set({ authorization: adminToken })

        const days = await SpecialDay.find()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(days.length).toBe(1);
        expect(days[0].newDay).toBe("Csütörtök");

    });


    it("Post endpoint without newDay property updates the newDay prop to null", async () => {

        const res = await request.post("/api/special-days")
            .send(
                {
                    day: "2021-06-12T00:00:00.000Z",
                    type: "active"
                }
            )
            .set({ authorization: adminToken })

        const days = await SpecialDay.find()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(days.length).toBe(1);
        expect(days[0].newDay).toBeNull();

    });

})

