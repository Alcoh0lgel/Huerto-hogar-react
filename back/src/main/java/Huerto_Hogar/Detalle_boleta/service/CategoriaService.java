package Huerto_Hogar.Detalle_boleta.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Huerto_Hogar.Detalle_boleta.models.entities.Categoria;
import Huerto_Hogar.Detalle_boleta.repository.CategoriaRepository;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> obtenerTodo(){
        return categoriaRepository.findAll();
    }

    public Categoria obtenerPorId(int id){
        return categoriaRepository.findById(id).orElse(null);
    }

    public Categoria guardar(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    public Categoria actualizar(int id, Categoria categoria){
        Categoria existente = categoriaRepository.findById(id).orElse(null);
        if (existente == null) {
            return null;
        }
        existente.setNombreCategoria(categoria.getNombreCategoria());
        return categoriaRepository.save(existente);
    }

    public boolean eliminar(int id){
        if (!categoriaRepository.existsById(id)) {
            return false;
        }
        categoriaRepository.deleteById(id);
        return true;
    }

}