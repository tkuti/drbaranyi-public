const Street = require("../../models/Street")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()

describe('POST ./api/streets endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })

    afterEach(async () => {
        await deleteAll([Street])
    })



    it("Post endpoint without token responds with 401", async () => {
        const res = await request.post("/api/streets")
            .send(
                {
                    "irsz": "1111",
                    "kozterulet": "Test Street1",
                    "jelleg": "utca",
                    "hsz": "1-11",
                    "oldal": "Páros",
                }
            )

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Post endpoint with user role token responds with 403", async () => {
        const res = await request.post("/api/streets").send(
            {
                "irsz": "1111",
                "kozterulet": "Test Street1",
                "jelleg": "utca",
                "hsz": "1-11",
                "oldal": "Páros",
            }
        ).set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Post endpoint with proper admin role token inserts the new street", async () => {

        const res = await request.post("/api/streets").send(
            {
                "irsz": "1111",
                "kozterulet": "Test Street1",
                "jelleg": "utca",
                "hsz": "1-11",
                "oldal": "Páros",
            }
        ).set({ authorization: adminToken })

        const count = await Street.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(count).toBe(1);

    })


    it("Post endpoint with missing body datas responds with 400", async () => {
        const res = await request.post("/api/streets").send(
            {
                "irsz": "1111",
                "kozterulet": "",
                "jelleg": "",
                "hsz": "1-11",
                "oldal": "Páros",
            }
        ).set({ authorization: adminToken })

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Hiányzó adatok!");
    });
})



