import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegionesComunas from '../../../data/regiones'; 
import App_navbarOut from '../../../components/navbar/navbarout'
import styles from './CrearCuenta/'

const KEY_STORAGE = 'clave_storage';

const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

const validar = (datos) => {
  const errores = {};

  
  const run = datos.run.trim().toUpperCase();
  if (run === '') {
    errores.run = 'El run es obligatorio.';
  } else if (run.length < 7 || run.length > 9) {
    errores.run = 'El run debe tener entre 7 y 9 caracteres.';
  } else if (!/^[0-9]+[0-9K]$/.test(run)) {
    errores.run = 'El run debe tener numeros y un digito verificador';
  }


  const nombre = datos.nombre.trim();
  if (nombre === '') {
    errores.nombre = 'El nombre es obligatorio';
  } else if (nombre.length > 50) {
    errores.nombre = 'Maximo 50 caracteres.';
  }

  
  const apellido = datos.apellido.trim();
  if (apellido === '') {
    errores.apellido = 'Los apellidos son obligatorios';
  } else if (apellido.length > 100) {
    errores.apellido = 'Maximo 100 caracteres.';
  }


  const correo = datos.correo.trim();
  const dominio = correo.split('@')[1];
  if (correo === '') {
    errores.correo = 'El correo es obligatorio.';
  } else if (correo.length > 100) {
    errores.correo = 'Maximo 100 caracteres';
  } else if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    errores.correo = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl, @gmail.com';
  }

  const password = datos.password.trim();
  if (password === '') {
    errores.password = 'La contraseña es obligatoria';
  } else if (password.length < 4 || password.length > 10) {
    errores.password = 'La contraseña debe tener entre 4 y 10 caracteres';
  }

  
  const direccion = datos.direccion.trim();
  if (direccion === '') {
    errores.direccion = 'La direccion es obligatoria';
  } else if (direccion.length > 300) {
    errores.direccion = 'El maximo de caracteres para la direccion son 300';
  }

  return errores;
};

export const CrearCuenta = () => {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    run: '',
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    telefono: '',
    region: '',
    comuna: '',
    direccion: '',
  });
  const [errores, setErrores] = useState({});

  const regionElegida = RegionesComunas.find((r) => r.region === datos.region);
  const comunas = regionElegida ? regionElegida.comunas : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

   
    if (name === 'region') {
      setDatos({ ...datos, region: value, comuna: '' });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  };

  const handleSubmit = () => {
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return; // hay errores, no se envía

    const nuevoUsuario = {
      run: datos.run.trim().toUpperCase(),
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      correo: datos.correo.trim(),
      password: datos.password.trim(),
      telefono: datos.telefono.trim(),
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion.trim(),
    };

    const lista = JSON.parse(localStorage.getItem(KEY_STORAGE)) || [];
    lista.push(nuevoUsuario); // objeto directo, sin arreglo dentro de arreglo
    localStorage.setItem(KEY_STORAGE, JSON.stringify(lista));

    navigate('/'); 
  };

  return (
    <>
      <App_navbarOut/>

      <main className="contenidoCrear">
        <section id="formularioCrear">
          <div className="contenedor">
            <div className="logo">
              <img src="/img/HuertoHogar.png" alt="logo huerto hogar" className="logo-formulario" />
              <h2>Crear Cuenta</h2>

              <p>Datos personales</p>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="inputRun"
                  name="run"
                  placeholder="19011022k"
                  maxLength={9}
                  value={datos.run}
                  onChange={handleChange}
                />
                <label htmlFor="inputRun">Run (sin puntos ni guion)</label>
                <div className="texto-error">{errores.run}</div>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="inputNombre"
                  name="nombre"
                  placeholder="Pepito"
                  maxLength={50}
                  value={datos.nombre}
                  onChange={handleChange}
                />
                <label htmlFor="inputNombre">Nombres</label>
                <div className="texto-error">{errores.nombre}</div>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="inputApellido"
                  name="apellido"
                  placeholder="Perez"
                  maxLength={100}
                  value={datos.apellido}
                  onChange={handleChange}
                />
                <label htmlFor="inputApellido">Apellidos</label>
                <div className="texto-error">{errores.apellido}</div>
              </div>

              <p>Correo electrónico</p>
              <div className="form-floating mb-4">
                <input
                  type="email"
                  className="form-control"
                  id="inputCorreo"
                  name="correo"
                  placeholder="nombre@duocuc.cl"
                  maxLength={100}
                  value={datos.correo}
                  onChange={handleChange}
                />
                <label htmlFor="inputCorreo">Correo Electrónico</label>
                <div className="texto-error">{errores.correo}</div>
              </div>

              <p>Contraseña</p>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="inputpassword"
                  name="password"
                  placeholder="Contraseña"
                  value={datos.password}
                  onChange={handleChange}
                />
                <label htmlFor="inputpassword">Contraseña</label>
                <div className="texto-error">{errores.password}</div>
              </div>

              <p>Telefono</p>
              <div className="form-floating mb-3">
                <input
                  type="tel"
                  className="form-control"
                  id="inputTelefono"
                  name="telefono"
                  placeholder="+56945678912"
                  value={datos.telefono}
                  onChange={handleChange}
                />
                <label htmlFor="inputTelefono">Telefono</label>
              </div>

              <p>Ingresar Direccion</p>
              <div className="row mb-4">
                <div className="col-md-6">
                  <select
                    className="form-select"
                    id="seleccionRegion"
                    name="region"
                    value={datos.region}
                    onChange={handleChange}
                  >
                    <option value="" disabled>---Selecciona la Region</option>
                    {RegionesComunas.map((item) => (
                      <option key={item.region} value={item.region}>
                        {item.region}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <select
                    className="form-select"
                    id="seleccionComuna"
                    name="comuna"
                    value={datos.comuna}
                    onChange={handleChange}
                  >
                    <option value="" disabled>---Selecciona la Comuna</option>
                    {comunas.map((comuna) => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="inputDireccion"
                  name="direccion"
                  placeholder="Calle Falsa 123"
                  maxLength={300}
                  value={datos.direccion}
                  onChange={handleChange}
                />
                <label htmlFor="inputDireccion">Direccion</label>
                <div className="texto-error">{errores.direccion}</div>
              </div>

              <div className="acceder">
                <div className="btn-envio">
                  <button type="button" className="btn btn-success py-2" onClick={handleSubmit}>
                    Enviar
                  </button>
                </div>
                <Link to="/acceder">Iniciar sesión</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

    
    </>
  );
};

export default CrearCuenta;