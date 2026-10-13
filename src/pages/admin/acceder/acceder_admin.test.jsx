import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import LoginAdmin from "./acceder_admin";

test('Probar el boton Acceder de administrador', () => {
    render(
        <MemoryRouter>
            <LoginAdmin />
        </MemoryRouter>
    );

    const botonAcceder = screen.getByRole('button', { name: /acceder/i });
    fireEvent.click(botonAcceder);
    expect(botonAcceder).toBeTruthy();
});

test("Probar input de contraseña del administrador", () => {
    render(<MemoryRouter><LoginAdmin /></MemoryRouter>);

    const input = screen.getByPlaceholderText("*********");
    fireEvent.change(input, { target: { value: "secreto123" } });
    
    expect(input.value).toBe("secreto123");
});