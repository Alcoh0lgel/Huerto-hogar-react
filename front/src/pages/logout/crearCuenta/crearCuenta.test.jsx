import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import CrearCuenta from "./crearCuenta";

vi.mock("../../../components/navbar/navbaracceder", () => ({
    default: () => null,
}));

test('Validar que la contraseña no este vacia', () => {
    render(
        <MemoryRouter>
            <CrearCuenta />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    expect(screen.getByText('La contraseña es obligatoria')).toBeTruthy();
});