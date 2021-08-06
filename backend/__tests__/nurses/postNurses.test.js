const Nurse = require("../../models/Nurse")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()


describe('POST ./api/nurses endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })

    afterEach(async () => {
        await deleteAll([Nurse])
    })



    it("Post endpoint without token responds with 401", async () => {
        const res = await request.post("/api/nurses").send(
            {
                "name": "Test Nurse1",
                "phone": "06-30 522-2222",
            }
        )

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Post endpoint with user role token responds with 403", async () => {
        const res = await request.post("/api/nurses").send(
            {
                "name": "Test Nurse1",
                "phone": "06-30 522-2222",
            }
        ).set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Post endpoint with proper admin role token inserts the new nurse", async () => {

        const res = await request.post("/api/nurses").send(
            {
                "name": "Test Nurse1",
                "phone": "06-30 522-2222",
            }
        ).set({ authorization: adminToken })

        const count = await Nurse.countDocuments()

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(count).toBe(1);

    })


    it("Post endpoint with missing body datas responds with 400", async () => {
        const res = await request.post("/api/nurses").send(
            {
                "name": "Test Nurse1",
                "phone": "",
            }
        ).set({ authorization: adminToken })

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Hiányzó adatok!");
    });
})



