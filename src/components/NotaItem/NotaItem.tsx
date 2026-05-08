import styles from "./notaItem.module.css";
import type { Nota } from "../../models/nota";
import { useSortable } from "@dnd-kit/sortable";
import { EllipsisVertical, Pin, PinOff, Trash2 } from "lucide-react";

interface Props {
    nota: Nota;
    onClick: CallableFunction;
    onEliminar: (id: number) => void;
    onFijar: (id: number) => void;
}

function NotaItem({ nota, onClick, onEliminar, onFijar }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: nota.id });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition,
        opacity: isDragging ? 0.4 : 1,
        cursor: isDragging ? "grabbing" : "grab",
    };

    return (
        <div
            ref={setNodeRef}
            className={`${styles.contenedorNotaItem} ${nota.fijada ? styles.fijado : ""}`}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onClick(nota)}
        >
            <div className={styles.parteSuperior}>
                {nota.titulo && <h4>{nota.titulo}</h4>}
                {nota.titulo && nota.fijada && <Pin size={20} />}
                {nota.titulo && (
                    <div className={styles.btnOpciones}>
                        <EllipsisVertical />
                        <div className={styles.menu}>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFijar(nota.id);
                                }}
                            >
                                {nota.fijada ? (
                                    <>
                                        <PinOff
                                            size={16}
                                            className={styles.iconosOpc}
                                        />
                                        No fijar
                                    </>
                                ) : (
                                    <>
                                        <Pin
                                            size={16}
                                            className={styles.iconosOpc}
                                        />
                                        Fijar
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEliminar(nota.id);
                                }}
                            >
                                <Trash2
                                    size={16}
                                    className={styles.iconosOpc}
                                />
                                Eliminar
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.parteInferior}>
                <p title={nota.nota}>{nota.nota}</p>
                {!nota.titulo && nota.fijada && <Pin size={20} />}
                {!nota.titulo && (
                    <div
                        className={styles.btnOpciones}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <EllipsisVertical />
                        <div className={styles.menu}>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFijar(nota.id);
                                }}
                            >
                                {nota.fijada ? (
                                    <>
                                        <PinOff
                                            size={16}
                                            className={styles.iconosOpc}
                                        />
                                        No fijar
                                    </>
                                ) : (
                                    <>
                                        <Pin
                                            size={16}
                                            className={styles.iconosOpc}
                                        />
                                        Fijar
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEliminar(nota.id);
                                }}
                            >
                                <Trash2
                                    size={16}
                                    className={styles.iconosOpc}
                                />
                                Eliminar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotaItem;
