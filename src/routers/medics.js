import Router from "@koa/router";
const router = new Router({
    prefix: "/medics",
});

let base = [];
let idCounter = 1;

router.get("/", (ctx) => {
    ctx.body = base;
})

router.get("/:id", (ctx) => {
    const id = parseInt(ctx.params.id);
    const medics = base.finf((p) => p.id == id);
    if(!medics){
        ctx.status = 404;
        ctx.body = { error: "Medico no encontrado" };
        return;
    }

    ctx.body = medics;
})

router.post("/", (ctx) => {
    const { nombre, apellido, matricula, dni, especialidad } = ctx.request.body;

    if(!nombre || !apellido || matricula || dni || especialidad){
        ctx.status = 404;
        ctx.body = { error: "Faltan Datos Obligatorios"};
        return;
    }

    const newMedic = {
        id: idCounter++,
        nombre,
        apellido,
        matricula,
        dni,
        especialidad,
    };

    base.push(newMedic);
    ctx.status = 201;
    ctx.body = newMedic.id;
});

router.put("/:id", (ctx) => {
    const id = parseint(ctx.params.id);
    const { nombre, apellido, matricula, dni, especialidad } = ctx.request.body;

    const index = base.findIndex((p) => p.id === id);

    if(index === -1){
        ctx.status = 404;
        ctx.body = { error: "medico seleccionado no encontrado" };
        return;
    }

    base[index] = {
        ...base[index],
        nombre: nombre ?? base[index].nombre,
        apellido: apellido ?? base[index].apellido,
        matricula: matricula ?? base[index].matricula,
        dni: dni ?? base[index].dni,
        especialidad: especialidad ?? base[index].especialidad,
    };

    ctx.status = 201;
    ctx.body = base[index].id;
});

router.delete("/:id", (ctx) => {
    const id = parseint(ctx.params.id);

    const index = base.findIndex((p) => p.id === id);

    if(index === -1){
        ctx.status = 404;
        ctx.body = { error: "medico seleccionado no encontrado"};
        return;
    }

    const deleted = base.splice(index, 1);
    ctx.body = {
        message: "Medico eliminado correctamente",
        medico: deleted[0],
    };
});

export default router;