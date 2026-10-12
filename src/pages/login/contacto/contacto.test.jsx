import { fireEvent,render,screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect,test } from "vitest";
import Contacto from "./contacto_in";

test('Probar boton enviar', () => { 
    render(
        <MemoryRouter>
            <Contacto/>
        </MemoryRouter>
    );

    const boton = screen.getByRole('button',{name:/enviar mensaje/i});
    fireEvent.click(boton);
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy();



});