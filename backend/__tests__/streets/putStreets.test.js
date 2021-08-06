const Street = require("../../models/Street")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()

describe('PUT ./api/streets endpoint testing ', () => {
    let mongoServer
    let streetId

    beforeAll(async () => {
        mongoServer = await startServer()
        await Street.insertMany([
            {
                "irsz": "1111",
                "kozterulet": "Test Street1",
                "jelleg": "utca",
                "hsz": "1-11",
                "oldal": "Páros",
            },
            {
                "irsz": "2222",
                "kozterulet": "Test Street2",
                "jelleg": "utca",
                "hsz": "23-33",
                "oldal": "Páratlan",
            }
        ])
        const street = await Street.findOne({ irsz: "2222" })
        streetId = String(street._id)
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })


    it("Put endpoint without token responds with 401", async () => {

        const res = await request.put(`/api/streets/${streetId}`).send({
            irsz: "2222",
            kozterulet: "Test Street2 Updated",
            jelleg: "utca",
            hsz: "23-33",
            oldal: "Páratlan",
        })

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Put endpoint with user role token responds with 403", async () => {

        const res = await request.put(`/api/streets/${streetId}`).send({
            irsz: "2222",
            kozterulet: "Test Street2 Updated",
            jelleg: "utca",
            hsz: "23-33",
            oldal: "Páratlan",
        }).set({ authorization: userToken });

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Put endpoint with proper admin role token updates the existing street", async () => {

        const res = await request.put(`/api/streets/${streetId}`).send({
            irsz: "2222",
            kozterulet: "Test Street2 Updated",
            jelleg: "utca",
            hsz: "23-33",
            oldal: "Páratlan",
        }).set({ authorization: adminToken });

        const count = await Street.countDocuments()
        const updatedStreet = await Street.findOne({ _id: streetId })

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(updatedStreet.kozterulet).toBe("Test Street2 Updated");
        expect(updatedStreet._id.toString()).toMatch(streetId)
        expect(count).toBe(2);

    })


    it("Put endpoint with missing body datas responds with 400", async () => {
        const res = await request.put(`/api/streets/${streetId}`).send({
            irsz: "2222",
            kozterulet: "",
            jelleg: "",
            hsz: "23-33",
            oldal: "Páratlan",
        }).set({ authorization: adminToken });

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Hiányzó adatok!");
    });


    it("Put endpoint with non-existing Id returns 404 error", async () => {

        const res = await request.put("/api/streets/61081dea2793df1da15bf2fb").send({
            irsz: "2222",
            kozterulet: "Test Street2 Updated",
            jelleg: "utca",
            hsz: "23-33",
            oldal: "Páratlan",
        }).set({ authorization: adminToken });

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Nem található a megadott utca!");
    });
})



