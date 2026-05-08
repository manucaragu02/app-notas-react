const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Endpoint custom
server.patch("/api/notas/reorder", (req, res) => {
    const db = router.db; // acceso directo a la base de datos
    const updates = req.body; // [{ id: 1, order: 0 }, ...]

    updates.forEach(({ id, order }) => {
        db.get("notas")
            .find({ id })
            .assign({ order })
            .write();
    });

    res.json({ ok: true });
});

// El resto de rutas las maneja JSON Server normal
server.use("/api", router);

server.listen(3001, () => {
    console.log("JSON Server corriendo en puerto 3001");
});