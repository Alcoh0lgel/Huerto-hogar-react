import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import BoletasAdmin from "./boletas";

test("Probar clic en botón 'Ver Detalle' abre el modal de boleta", () => {
    render(
        <MemoryRouter>
            <BoletasAdmin />
        </MemoryRouter>
    );

    // Obtiene el primer botón de "Ver Detalle" de la tabla
    const botonesDetalle = screen.getAllByText(/Ver Detalle/i);
    fireEvent.click(botonesDetalle[0]);

    // Verifica que el modal se abrió buscando su encabezado
    const tituloModal = screen.getByText(/Detalle de Boleta/i);
    expect(tituloModal).toBeTruthy();
});