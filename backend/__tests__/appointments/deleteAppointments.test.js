const Appointment = require("../../models/Appointment")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer } = require('../util/inMemDb')
const { createJwtUserToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()

describe('DELETE ./api/appointments/:_id endpoint testing ', () => {
    let mongoServer
    let appointmentId

    beforeAll(async () => {
        mongoServer = await startServer()
        await Appointment.insertMany([
            {
                userId: "987654321",
                userName: "Test User2",
                email: "test2@test.com",
                description: "Test Child 2 vaccination",
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
                day: new Date("2021-07-02"),
                time: "12:00"
            },
        ])
        const appointment = await Appointment.findOne({
            day: "2021-07-02T00:00:00.000Z",
            time: "12:00"
        })
        appointmentId = String(appointment._id)
    })

    afterAll(async () => {
        await stopServer(mongoServer)
    })



    it("Delete endpoint without token responds with 401", async () => {

        const res = await request.delete(`/api/appointments/${appointmentId}`)

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Delete endpoint with non-existing Id returns 404 error", async () => {

        const res = await request.delete("/api/appointments/61081dea2793df1da15bf2fb")
            .set({ authorization: userToken })

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Nem található a megadott időpont!");
    });


    it("Delete endpoint with Id not belong to the user returns 403 error", async () => {

        const appointment = await Appointment.findOne({
            day: "2021-07-01T00:00:00.000Z",
            time: "16:00"
        })

        const res = await request.delete(`/api/appointments/${appointment._id}`)
            .set({ authorization: userToken })

        expect(res.status).toBe(403);
        expect(res.body.msg).toBe("Eltérő user!");
    });


    it("Delete endpoint with proper token deletes the appointment", async () => {

        const res = await request.delete(`/api/appointments/${appointmentId}`)
            .set({ authorization: userToken })

        const deletedAppointment = await Appointment.findOne({ _id: appointmentId })

        const count = await Appointment.countDocuments()

        expect(deletedAppointment).toBeNull()
        expect(count).toBe(1)
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Sikeres törlés");

    })

})



