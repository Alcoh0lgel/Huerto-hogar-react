package Huerto_Hogar.Detalle_boleta.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public DetalleBoleta guardar(DetalleBoleta detalle) {
        Boleta boleta = boletaRepository.findById(detalle.getBoleta().getIdBoleta()).orElse(null);
        Producto producto = productoRepository.findById(detalle.getProducto().getId_producto()).orElse(null);
        if (boleta == null || producto == null) {
            return null;
        }

        detalle.setBoleta(boleta);
        detalle.setProducto(producto);

        detalle.setPrecioUnitario(producto.getPrecio());
        detalle.setSubtotal(producto.getPrecio() * detalle.getCantidad());

        return detalleBoletaRepository.save(detalle);
    }

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

        existente.setCantidad(detalle.getCantidad());
        existente.setBoleta(boleta);
        existente.setProducto(producto);
        existente.setPrecioUnitario(producto.getPrecio());
        existente.setSubtotal(producto.getPrecio() * detalle.getCantidad());

        return detalleBoletaRepository.save(existente);
    }

    public boolean eliminar(int id) {
        if (!detalleBoletaRepository.existsById(id)) {
            return false;
        }
        detalleBoletaRepository.deleteById(id);
        return true;
    }

    public List<DetalleBoleta> obtenerPorBoleta(int idBoleta) {
        return detalleBoletaRepository.findByBoletaIdBoleta(idBoleta);
    }

    
}