const Nurse = require("../../models/Nurse")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()

describe('DELETE ./api/nurses endpoint testing ', () => {
    let mongoServer
    let nurseId

    beforeAll(async () => {
        mongoServer = await startServer()
        await Nurse.insertMany([
            {
                "name": "Test Nurse1",
                "phone": "06-30 522-2222",

            },
            {
                "name": "Test Nurse2",
                "phone": "06-30 633-3333"
            }
        ])
        const nurse = await Nurse.findOne({ name: "Test Nurse1" })
        nurseId = String(nurse._id)
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })



    it("Delete endpoint without token responds with 401", async () => {

        const res = await request.delete(`/api/nurses/${nurseId}`)

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Delete endpoint with user role token responds with 403", async () => {

        const res = await request.delete(`/api/nurses/${nurseId}`).set({ authorization: userToken });

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Delete endpoint with proper admin role token deletes the nurse", async () => {

        const res = await request.delete(`/api/nurses/${nurseId}`).set({ authorization: adminToken })

        const deletedNurse = await Nurse.findOne({ _id: nurseId })
       
        expect(deletedNurse).toBeNull()
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");

    })


    it("Delete endpoint with non-existing Id returns 404 error", async () => {

        const res = await request.delete("/api/nurses/61081dea2793df1da15bf2fb").set({ authorization: adminToken })

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Nem található a megadott védőnő!");
    });
})



