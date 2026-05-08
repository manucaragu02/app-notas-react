import { useState } from "react";
import Modal from "@mui/material/Modal";
import { X } from "lucide-react";
import styles from "./notaForm.module.css";
import type { Nota } from "../../models/nota";

interface Props {
    nota: Nota | null;
    onGuardar: (nota: Nota) => void;
    onCerrar: () => void;
    numNotas?: number;
}

function NotaForm({ nota, onGuardar, onCerrar, numNotas = 0 }: Props) {
    const esEdicion = nota !== null;

    const [txtTitulo, setTxtTitulo] = useState(() => (nota ? nota.titulo : ""));
    const [txtNota, setTxtNota] = useState(() => (nota ? nota.nota : ""));
    const [editado, setEditado] = useState(false);

    const guardar = async (titulo: string, contenido: string) => {
        if (!esEdicion && !titulo.trim() && !contenido.trim()) return;
        if (!esEdicion) setEditado(true);

        const url = esEdicion ? `/api/notas/${nota.id}` : "/api/notas";
        const method = esEdicion ? "PATCH" : "POST";
        const nuevaNota = esEdicion
            ? {
                  titulo,
                  nota: contenido,
                  lastUpdatedAt: new Date().toISOString(),
              }
            : {
                  titulo,
                  nota: contenido,
                  createdAt: new Date().toISOString(),
                  lastUpdatedAt: new Date().toISOString(),
                  order: numNotas,
              };

        if (editado) {
            const respuesta = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaNota),
            });
            const data = await respuesta.json();
            onGuardar(data);
        }
        setEditado(false);
    };

    const handleCerrar = async () => {
        await guardar(txtTitulo, txtNota);

        onCerrar();
    };

    const formatFecha = (fechaHora: string): string => {
        const fechaHoraFormat = new Date(fechaHora);

        return `${fechaHoraFormat.getDate()}-${fechaHoraFormat.getMonth() + 1}-${fechaHoraFormat.getFullYear()} ${fechaHoraFormat.getHours()}:${fechaHoraFormat.getMinutes()}`;
    };

    return (
        <div>
            <Modal
                open
                onClose={handleCerrar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.notaFormContainer}>
                    <h2>{esEdicion ? "Editar nota" : "Nueva nota"}</h2>
                    <span className={styles.ultimaModificacion}>
                        {esEdicion
                            ? `Última modificación: ${formatFecha(nota.lastUpdatedAt)}`
                            : ""}
                    </span>
                    <button
                        type="button"
                        onClick={handleCerrar}
                        className={styles.btnCerrar}
                    >
                        <X size={32} />
                    </button>
                    <form>
                        <input
                            type="text"
                            defaultValue={nota?.titulo ?? ""}
                            value={txtTitulo}
                            onChange={(e) => {
                                setTxtTitulo(e.target.value);
                                setEditado(true);
                            }}
                            placeholder="Título"
                        />

                        <textarea
                            defaultValue={nota?.nota ?? ""}
                            value={txtNota}
                            onChange={(e) => {
                                setTxtNota(e.target.value);
                                setEditado(true);
                            }}
                            placeholder="Escribe aquí tu nota..."
                        />
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default NotaForm;
