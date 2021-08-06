const Nurse = require("../../models/Nurse")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('../util/inMemDb')
const { createJwtAdminToken, createJwtUserToken } = require('../util/createJwtToken')

const adminToken = createJwtAdminToken()
const userToken = createJwtUserToken()

describe('PUT ./api/nurses endpoint testing ', () => {
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



    it("Put endpoint without token responds with 401", async () => {

        const res = await request.put(`/api/nurses/${nurseId}`).send({
            name: "Test Nurse Update",
            phone: "06-30 522-2222"
        })

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Put endpoint with user role token responds with 403", async () => {

        const res = await request.put(`/api/nurses/${nurseId}`).send({
            name: "Test Nurse Update",
            phone: "06-30 522-2222"
        }).set({ authorization: userToken });

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Nem megfelelő jogosultság!");
    });


    it("Put endpoint with proper admin role token updates the existing nurse", async () => {

        const res = await request.put(`/api/nurses/${nurseId}`).send({
            name: "Test Nurse Update",
            phone: "06-30 522-2222"
        }).set({ authorization: adminToken });

        const count = await Nurse.countDocuments()
        const updatedNurse = await Nurse.findOne({ _id: nurseId })

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres mentés");
        expect(updatedNurse.name).toBe("Test Nurse Update");
        expect(updatedNurse._id.toString()).toMatch(nurseId)
        expect(count).toBe(2);

    })


    it("Put endpoint with missing body datas responds with 400", async () => {
        const res = await request.put(`/api/nurses/${nurseId}`).send({
            name: "Test Nurse Update",
            phone: ""
        }).set({ authorization: adminToken });

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Hiányzó adatok!");
    });

    it("Put endpoint with non-existing Id returns 404 error", async () => {

        const res = await request.put("/api/nurses/61081dea2793df1da15bf2fb").send({
            name: "Test Nurse Update",
            phone: "06-30 522-2222"
        }).set({ authorization: adminToken });

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Nem található a megadott védőnő!");
    });
})



