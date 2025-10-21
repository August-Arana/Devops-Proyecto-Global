import request from "supertest";
import app from "../app.js";

describe("API de Pacientes", () => {
  let createdId;

  test("POST /patients → crea un paciente nuevo", async () => {
    const res = await request(app.callback())
      .post("/patients")
      .send({
        nombre: "Agustin",
        apellido: "Arana",
        edad: 35,
        dni: "12345678",
        causaIngreso: "Fiebre alta",
      });

    expect(res.status).toBe(201);
    expect(typeof res.body).toBe("number"); // devuelve id
    createdId = res.body;
  });

  test("GET /patients → devuelve la lista de pacientes", async () => {
    const res = await request(app.callback()).get("/patients");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /patients/:id → devuelve un paciente específico", async () => {
    const res = await request(app.callback()).get(`/patients/${createdId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdId);
    expect(res.body.nombre).toBe("Agustin");
  });

  test("PUT /patients/:id → actualiza un paciente existente", async () => {
    const res = await request(app.callback())
      .put(`/patients/${createdId}`)
      .send({
        causaIngreso: "Dolor abdominal",
      });

    expect(res.status).toBe(201);
    expect(res.body).toBe(createdId);

    // Verificamos el cambio
    const getRes = await request(app.callback()).get(`/patients/${createdId}`);
    expect(getRes.body.causaIngreso).toBe("Dolor abdominal");
  });

  test("DELETE /patients/:id → elimina un paciente", async () => {
    const res = await request(app.callback()).delete(`/patients/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/eliminado/i);
  });

  test("GET /patients/:id → devuelve 404 si no existe", async () => {
    const res = await request(app.callback()).get(`/patients/99999`);
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/no encontrado/i);
  });

  test("POST /patients → devuelve 404 si faltan campos", async () => {
    const res = await request(app.callback())
      .post("/patients")
      .send({ nombre: "Carlos" }); // faltan campos

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/faltan/i);
  });
});

afterAll(async () => {
  await Sentry.close(2000);
});