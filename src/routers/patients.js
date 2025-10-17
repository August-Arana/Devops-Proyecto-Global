import Router from "@koa/router";
const router = new Router({
  prefix: "/patients",
});

let base = [];
let idCounter = 1;

router.get("/", (ctx) => {
  ctx.body = base;
});

router.get("/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const patient = base.find((p) => p.id == id);
  if (!patient) {
    ctx.status = 404;
    ctx.body = { error: "Paciente no encontrado" };
    return;
  }

  ctx.body = patient;
});

router.post("/", (ctx) => {
  const { nombre, apellido, edad, dni, causaIngreso } = ctx.request.body;

  if (!nombre || !apellido || !edad || !dni || !causaIngreso) {
    ctx.status = 404;
    ctx.body = { error: "Faltan Datos Obligatorios" };
    return;
  }

  const newPatient = {
    id: idCounter++,
    nombre,
    apellido,
    edad,
    dni,
    causaIngreso,
  };

  base.push(newPatient);
  ctx.status = 201;
  ctx.body = newPatient.id;
});

router.put("/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const { nombre, apellido, edad, dni, causaIngreso } = ctx.request.body;

  const index = base.findIndex((p) => p.id === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = { error: "paciente seleccionado no encontrado" };
    return;
  }

  base[index] = {
    ...base[index],
    nombre: nombre ?? base[index].nombre,
    apellido: apellido ?? base[index].apellido,
    edad: edad ?? base[index].edad,
    dni: dni ?? base[index].dni,
    causaIngreso: causaIngreso ?? base[index].causaIngreso,
  };

  ctx.status = 201;
  ctx.body = base[index].id;
});

router.delete("/:id", (ctx) => {
  const id = parseInt(ctx.params.id);

  const index = base.findIndex((p) => p.id === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = { error: "paciente seleccionado no encontrado" };
    return;
  }
  const deleted = base.splice(index, 1);
  ctx.body = {
    message: "Paciente eliminado correctamente",
    paciente: deleted[0],
  };
});


export default router;
