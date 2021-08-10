const ConsultingHours = require("../../models/ConsultingHours")
const app = require("../../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer } = require('../util/inMemDb')
const { createJwtUserToken } = require('../util/createJwtToken')

const userToken = createJwtUserToken()

describe('GET ./api/consulting-hours endpoint testing ', () => {
    let mongoServer

    beforeAll(async () => {
        mongoServer = await startServer()
        await ConsultingHours.insertMany([
            {
                name: "Hétfő",
                "hours": [
                    {
                      "type": "generale",
                      "time": "16:00"
                    },
                    {
                      "type": "generale",
                      "time": "16:15"
                    },
                    {
                      "type": "generale",
                      "time": "16:30"
                    },
                    {
                      "type": "generale",
                      "time": "16:45"
                    },
                    {
                      "type": "generale",
                      "time": "17:00"
                    },
                    {
                      "type": "generale",
                      "time": "17:15"
                    },
                    {
                      "type": "generale",
                      "time": "17:30"
                    },
                    {
                      "type": "generale",
                      "time": "17:45"
                    },
                    {
                      "type": "generale",
                      "time": "18:00"
                    },
                    {
                      "type": "generale",
                      "time": "18:15"
                    },
                    {
                      "type": "generale",
                      "time": "18:30"
                    },
                    {
                      "type": "generale",
                      "time": "18:45"
                    },
                    {
                      "type": "generale",
                      "time": "19:00"
                    },
                    {
                      "type": "generale",
                      "time": "19:15"
                    },
                    {
                      "type": "generale",
                      "time": "19:30"
                    },
                    {
                      "type": "generale",
                      "time": "19:45"
                    }
                  ]
            },
            {
                name: "Kedd",
                "hours": [
                    {
                      "type": "vaccination",
                      "time": "14:00"
                    },
                    {
                      "type": "vaccination",
                      "time": "14:15"
                    },
                    {
                      "type": "vaccination",
                      "time": "14:30"
                    },
                    {
                      "type": "vaccination",
                      "time": "14:45"
                    },
                    {
                      "type": "vaccination",
                      "time": "15:00"
                    },
                    {
                      "type": "vaccination",
                      "time": "15:15"
                    },
                    {
                      "type": "vaccination",
                      "time": "15:30"
                    },
                    {
                      "type": "vaccination",
                      "time": "15:45"
                    },
                    {
                      "type": "generale",
                      "time": "16:00"
                    },
                    {
                      "type": "generale",
                      "time": "16:15"
                    },
                    {
                      "type": "generale",
                      "time": "16:30"
                    },
                    {
                      "type": "generale",
                      "time": "16:45"
                    },
                    {
                      "type": "generale",
                      "time": "17:00"
                    },
                    {
                      "type": "generale",
                      "time": "17:15"
                    },
                    {
                      "type": "generale",
                      "time": "17:30"
                    },
                    {
                      "type": "generale",
                      "time": "17:45"
                    }
                  ]
            },
        ])
    })


    afterAll(async () => {
        await stopServer(mongoServer)
    })


    it("Get endpoint without token responds with 401", async () => {
        const res = await request.get("/api/consulting-hours")

        expect(res.status).toBe(401);
        expect(res.body.msg).toBe("Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!");
    });


    it("Get endpoint with proper token returns the consulting hours documents ", async () => {

        const res = await request.get("/api/consulting-hours")
        .set({ authorization: userToken })

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[1].name).toBe("Kedd");
        expect(res.body[1].hours.length).toBe(16);

    });

})

