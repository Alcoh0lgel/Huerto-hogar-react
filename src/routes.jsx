import React from 'react';
import { Routes, Route, createBrowserRouter } from 'react-router-dom';

// 1. RUTAS PÚBLICAS / VISITANTE (logout)
import Menu from './pages/logout/menu/menu';
import Nosotros from './pages/logout/nosotros/nosotros';
import Contacto from './pages/logout/contacto/contacto';
import Blogs from './pages/logout/blogs/blogs';
import Producto from './pages/logout/producto/producto';
import Acceder from './pages/logout/acceder/acceder';
import CrearCuenta from './pages/logout/crearCuenta/crearCuenta';

// 2. RUTAS USUARIO REGISTRADO (login)
import MenuIn from './pages/login/menu/menu_in';
import NosotrosIn from './pages/login/nosotros/nosotros_in';
import ContactoIn from './pages/login/contacto/contacto_in';
import BlogsIn from './pages/login/blogs/blogs_in';
import ProductoIn from './pages/login/producto/producto_in';

// 3. RUTAS ADMINISTRADOR (admin)
import AccederAdmin from './pages/admin/acceder/acceder_admin';
import MenuAdmin from './pages/admin/panel/menu_admin';

export const routes = createBrowserRouter([
    //primero las publicas para no confundirnos
    {
        path:'/',
        element:<Menu/>
    },
    {
        path:'/nosotros',
        element:<Nosotros/>
    },
    {
        path:'/acceder',
        element:<Acceder/>
    },
    {
        path:'/blogs',
        element:<Blogs/>
    },
    {
        path:'/contacto',
        element:<Contacto/>
    },
    {
        path:'/crearCuenta',
        element:<CrearCuenta/>
    },
    {
        path:'/producto',
        element:<Producto/>
    },
    //Ahora vienen las log in
    {
        path:'/login/menu',
        element:<MenuIn/>
    },
    {
        path:'/login/nosotros',
        element:<NosotrosIn/>
    },
    {
        path:'/login/blogs',
        element:<BlogsIn/>
    },
    {
        path:'/login/contacto',
        element:<ContactoIn/>
    },
    {
        path:'/login/producto',
        element:<ProductoIn/>
    },
    //Administrador
    {
        path:'/admin/acceder',
        element:<AccederAdmin/>
    },
    {
        path:'/admin/panel',
        element:<MenuAdmin/>
    }
]);