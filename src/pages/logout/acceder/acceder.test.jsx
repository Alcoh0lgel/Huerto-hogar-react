import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import Acceder from "./acceder";

vi.mock("../../../components/navbar/navbaracceder", () => ({
    default: () => null,
}));

test('Probar boton acceder', () => {
    render(
        <MemoryRouter>
            <Acceder />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /acceder/i }));

    expect(screen.getByText('El correo es obligatorio.')).toBeTruthy();
});

test('validar correo electronico', () => {
    render (
        <MemoryRouter>
            <Acceder />
        </MemoryRouter>

    );


    fireEvent.change(screen.getByLabelText('Correo Electrónico'), {
        target: { value: 'juanPerez@hotmail.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /acceder/i }));
    expect(
        screen.getByText('Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com')
    ).toBeTruthy();


});