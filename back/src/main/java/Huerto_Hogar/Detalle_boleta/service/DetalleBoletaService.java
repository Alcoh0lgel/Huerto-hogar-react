package Huerto_Hogar.Detalle_boleta.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import Huerto_Hogar.Detalle_boleta.models.entities.Boleta;
import Huerto_Hogar.Detalle_boleta.models.entities.DetalleBoleta;
import Huerto_Hogar.Detalle_boleta.models.entities.Producto;
import Huerto_Hogar.Detalle_boleta.repository.BoletaRepository;
import Huerto_Hogar.Detalle_boleta.repository.DetalleBoletaRepository;
import Huerto_Hogar.Detalle_boleta.repository.ProductoRepository;

@Service
public class DetalleBoletaService {

    @Autowired
    private DetalleBoletaRepository detalleBoletaRepository;

    @Autowired
    private BoletaRepository boletaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<DetalleBoleta> obtenerTodo() {
        return detalleBoletaRepository.findAll();
    }

    public DetalleBoleta obtenerPorId(int id) {
        return detalleBoletaRepository.findById(id).orElse(null);
    }

    @Transactional
    public DetalleBoleta guardar(DetalleBoleta detalle) {
        Boleta boleta = boletaRepository.findById(detalle.getBoleta().getIdBoleta()).orElse(null);
        Producto producto = productoRepository.findById(detalle.getProducto().getId_producto()).orElse(null);
        if (boleta == null || producto == null) {
            return null;
        }

        // Validar cantidad y stock disponible antes de descontar
        if (detalle.getCantidad() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad debe ser mayor a 0");
        }
        if (producto.getStock() < detalle.getCantidad()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Stock insuficiente para " + producto.getNombre() + " (disponible: " + producto.getStock() + ")"
            );
        }

        // Descontar stock y persistir el cambio en el producto
        producto.setStock(producto.getStock() - detalle.getCantidad());
        productoRepository.save(producto);

        detalle.setBoleta(boleta);
        detalle.setProducto(producto);

        detalle.setPrecioUnitario(producto.getPrecio());
        detalle.setSubtotal(producto.getPrecio() * detalle.getCantidad());

        return detalleBoletaRepository.save(detalle);
    }

    @Transactional
    public DetalleBoleta actualizar(int id, DetalleBoleta detalle) {
        DetalleBoleta existente = detalleBoletaRepository.findById(id).orElse(null);
        if (existente == null) {
            return null;
        }
        Boleta boleta = boletaRepository.findById(detalle.getBoleta().getIdBoleta()).orElse(null);
        Producto producto = productoRepository.findById(detalle.getProducto().getId_producto()).orElse(null);
        if (boleta == null || producto == null) {
            return null;
        }

        // Si cambió la cantidad o el producto, primero devolvemos lo que descontaba el detalle anterior
        Producto productoAnterior = existente.getProducto();
        productoAnterior.setStock(productoAnterior.getStock() + existente.getCantidad());
        productoRepository.save(productoAnterior);

        // Volvemos a buscar/validar el stock para la nueva cantidad
        Producto productoNuevo = productoRepository.findById(producto.getId_producto()).orElse(producto);
        if (detalle.getCantidad() <= 0 || productoNuevo.getStock() < detalle.getCantidad()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock insuficiente para actualizar el detalle");
        }
        productoNuevo.setStock(productoNuevo.getStock() - detalle.getCantidad());
        productoRepository.save(productoNuevo);

        existente.setCantidad(detalle.getCantidad());
        existente.setBoleta(boleta);
        existente.setProducto(productoNuevo);
        existente.setPrecioUnitario(productoNuevo.getPrecio());
        existente.setSubtotal(productoNuevo.getPrecio() * detalle.getCantidad());

        return detalleBoletaRepository.save(existente);
    }

    @Transactional
    public boolean eliminar(int id) {
        DetalleBoleta existente = detalleBoletaRepository.findById(id).orElse(null);
        if (existente == null) {
            return false;
        }

        // Devolver stock al eliminar el detalle
        Producto producto = existente.getProducto();
        if (producto != null) {
            producto.setStock(producto.getStock() + existente.getCantidad());
            productoRepository.save(producto);
        }

        detalleBoletaRepository.deleteById(id);
        return true;
    }

    public List<DetalleBoleta> obtenerPorBoleta(int idBoleta) {
        return detalleBoletaRepository.findByBoletaIdBoleta(idBoleta);
    }
}