import { useEffect, useState } from "react";
import NotaItem from "./components/NotaItem/NotaItem";
import type { Nota } from "./models/nota";
import "./App.css";
import { Plus } from "lucide-react";
import NotaForm from "./components/NotaForm/NotaForm";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

function App() {
    const [notas, setNotas] = useState<Nota[]>([]);
    const [notaSeleccionada, setNotaSeleccionada] = useState<
        Nota | null | undefined
    >(undefined);
    const notasFijadas = notas.filter((n) => n.fijada);
    const notasSinFijar = notas.filter((n) => !n.fijada);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setNotas((prev) => {
            const oldIndex = prev.findIndex((n) => n.id === active.id);
            const newIndex = prev.findIndex((n) => n.id === over.id);
            const nuevasNotas = arrayMove(prev, oldIndex, newIndex);

            persistirOrden(nuevasNotas);

            return nuevasNotas;
        });
    };

    const persistirOrden = async (notas: Nota[]) => {
        await fetch("/api/notas/reorder", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(notas.map((n, i) => ({ id: n.id, order: i }))),
        });
    };

    const handleGuardar = (notaGuardada: Nota) => {
        setNotas((prev) =>
            notaSeleccionada
                ? prev.map((n) => (n.id === notaGuardada.id ? notaGuardada : n))
                : [notaGuardada, ...prev],
        );
        setNotaSeleccionada(undefined);
    };

    const handleEliminar = async (id: number) => {
        await fetch(`/api/notas/${id}`, { method: "DELETE" });
        setNotas((prev) => prev.filter((n) => n.id !== id));
    };

    const handleFijar = async (id: number) => {
        const nota = notas.find((n) => n.id === id);
        const respuesta = await fetch(`/api/notas/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fijada: !nota.fijada }),
        });
        const data = await respuesta.json();
        setNotas((prev) => prev.map((n) => (n.id === id ? data : n)));
    };

    const compare = (a, b) => {
        if (a.order > b.order) {
            return -1;
        }
        if (a.order < b.order) {
            return 1;
        }
        return 0;
    };

    useEffect(() => {
        const fetchNotas = async () => {
            try {
                const response = await fetch("/api/notas");

                if (!response.ok) {
                    throw new Error(`Error http ${response.status}`);
                }

                const data = await response.json();
                data.sort(compare);

                setNotas(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNotas();
    }, []);

    return (
        <>
            <div className="contenedorPrincipal">
                <h1>Notas</h1>
                <button
                    type="button"
                    className="btnNuevaNota"
                    onClick={() => setNotaSeleccionada(null)}
                >
                    <Plus size={16} color="#202020" />
                    Nueva Nota
                </button>
                {notas.length === 0 ? (
                    <p className="noHayNotas">No hay notas que mostrar</p>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={notas.map((n) => n.id)}
                            strategy={rectSortingStrategy}
                        >
                            <div className="grid">
                                {notasFijadas.map((nota) => (
                                    <div className="gridItem" key={nota.id}>
                                        <NotaItem
                                            key={nota.id}
                                            nota={nota}
                                            onClick={() =>
                                                setNotaSeleccionada(nota)
                                            }
                                            onEliminar={() =>
                                                handleEliminar(nota.id)
                                            }
                                            onFijar={() => handleFijar(nota.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="grid">
                                {notasSinFijar.map((nota) => (
                                    <div className="gridItem" key={nota.id}>
                                        <NotaItem
                                            key={nota.id}
                                            nota={nota}
                                            onClick={() =>
                                                setNotaSeleccionada(nota)
                                            }
                                            onEliminar={() =>
                                                handleEliminar(nota.id)
                                            }
                                            onFijar={() => handleFijar(nota.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
                {notaSeleccionada !== undefined && (
                    <NotaForm
                        key={notaSeleccionada?.id ?? "nueva"}
                        nota={notaSeleccionada}
                        onGuardar={handleGuardar}
                        onCerrar={() => setNotaSeleccionada(undefined)}
                        numNotas={notas.length}
                    />
                )}
            </div>
        </>
    );
}

export default App;
