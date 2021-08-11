const Street = require("../../models/Street")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()

describe('DELETE ./api/streets endpoint testing ', () => {
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



    it("Delete endpoint without token responds with 401", async () => {

        const res = await request.delete(`/api/streets/${streetId}`)

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Delete endpoint with user role token responds with 403", async () => {

        const res = await request.delete(`/api/streets/${streetId}`).set({ authorization: userToken });

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Delete endpoint with proper admin role token deletes the street", async () => {

        const res = await request.delete(`/api/streets/${streetId}`).set({ authorization: adminToken })

        const deletedStreet = await Street.findOne({ _id: streetId })

        expect(deletedStreet).toBeNull()
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres törlés");

    })


    it("Delete endpoint with non-existing Id returns 404 error", async () => {

        const res = await request.delete("/api/streets/61081dea2793df1da15bf2fb").set({ authorization: adminToken })

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Nem található a megadott utca!");
    });
})



