const Nurse = require("../models/Nurse")
const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('./util/inMemDb')


describe('testing nurses endpoints with empty database', () => {
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


  it("Get endpoint with empty database", async () => {

    const res = await request.get("/api/nurses");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });


  it("Post endpoint with empty database inserts the new nurse", async () => {
    const res = await request.post("/api/nurses").send(
      {
        "name": "Test Nurse1",
        "phone": "06-30 522-2222",
      }
    )

    const count = await Nurse.countDocuments()

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Sikeres mentés");
    expect(count).toBe(1);
  });

})


describe('testing nurses endpoints with non-empty database', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await startServer()
  })

  afterAll(async () => {
    await stopServer(mongoServer)
  })

  beforeEach(async () => {
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
  })

  afterEach(async () => {
    await deleteAll([Nurse])
  })


  it("Get endpoint returns the existing nurses", async () => {

    const res = await request.get("/api/nurses");
    const count = await Nurse.countDocuments()

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[1].name).toBe("Test Nurse2");
    expect(res.body[1]._id).toBeDefined()
    expect(count).toBe(2);
  });

  it("Put endpoint updates the existing nurse", async () => {

    const nurse = await Nurse.findOne({ name: "Test Nurse1" })
    const nurseId = String(nurse._id)
    const res = await request.put(`/api/nurses/${nurseId}`).send({
      name: "Test Nurse Update",
      phone: "06-30 522-2222"
    });
    const count = await Nurse.countDocuments()
    const updatedNurse = await Nurse.findOne({ _id: nurseId })

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Sikeres mentés");
    expect(updatedNurse.name).toBe("Test Nurse Update");
    expect(updatedNurse._id.toString()).toMatch(nurseId)
    expect(count).toBe(2);
  });

  it("Put endpoint with non-existing Id returns 403 error", async () => {

    const res = await request.put("/api/nurses/61081dea2793df1da15bf2fb").send({
      name: "Test Nurse Update",
      phone: "06-30 522-2222"
    });

    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Nem található a megadott védőnő!");
  });

  it("Delete endpoint deletes the nurse", async () => {

    const nurse = await Nurse.findOne({ name: "Test Nurse1" })
    const nurseId = String(nurse._id)
    const res = await request.delete(`/api/nurses/${nurseId}`)

    const deletedNurse = await Nurse.findOne({_id: nurseId})

    expect(deletedNurse).toBeNull()
    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Sikeres mentés");
  });

  it("Delete endpoint with non-existing Id returns 403 error", async () => {

    const res = await request.delete("/api/nurses/61081dea2793df1da15bf2fb")

    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Nem található a megadott védőnő!");
  });
})