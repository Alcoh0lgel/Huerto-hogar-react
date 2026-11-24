package Huerto_Hogar.Detalle_boleta.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Huerto_Hogar.Detalle_boleta.repository.CategoriaRepository;
import Huerto_Hogar.Detalle_boleta.repository.ProductoRepository;

import Huerto_Hogar.Detalle_boleta.models.entities.Producto;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Producto> obtenerTodo(){
        return productoRepository.findAll();
    }

    public Producto obtenerPorId(int id){
        return productoRepository.findById(id).orElse(null);
    }

    public Producto guardar(Producto producto){
        producto.setCategoria(categoriaRepository.findById(producto.getCategoria().getIdCategoria()).orElse(null));
        return productoRepository.save(producto);
    }

    public Producto actualizar(int id, Producto producto){
        Producto existente = productoRepository.findById(id).orElse(null);
        if (existente == null) {
            return null;
        }
        existente.setNombre(producto.getNombre());
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
       // existente.setColor(producto.getImagen());
       //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
       existente.setPrecio(producto.getPrecio());
       existente.setStock(producto.getStock());
       existente.setDescripcion(producto.getDescripcion());
        existente.setCategoria(categoriaRepository.findById(producto.getCategoria().getIdCategoria()).orElse(null));
        return productoRepository.save(existente);
    }

    public boolean eliminar(int id){
        if (!productoRepository.existsById(id)) {
            return false;
        }
        productoRepository.deleteById(id);
        return true;
    }

}