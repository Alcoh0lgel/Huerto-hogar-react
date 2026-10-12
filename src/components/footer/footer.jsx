import { Container } from 'react-bootstrap';
import styles from './footer.module.css';

function Footer() {
    return (
        <footer className="bg-dark text-light py-2 mt-auto">
            <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center small">
                <div className="text-center ">
                    <div className="fw-semibold"> Huerto Hogar </div>
                    <div>🌱 Del campo a tu hogar 🏡</div>
                </div>
                <span> HuertoHogar@gmail.com</span>

                <span>
                    &copy; {new Date().getFullYear()} 🌱 Huerto Hogar. Todos los derechos reservados 🌱.
                </span>
            </Container>
        </footer>
    );
}

export default Footer;