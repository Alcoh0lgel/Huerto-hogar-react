package Huerto_Hogar.Detalle_boleta.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Huerto_Hogar.Detalle_boleta.models.entities.Usuario;
import Huerto_Hogar.Detalle_boleta.repository.UsuarioRepository;

@Service 
public class UsuarioService {

    @Autowired 
    private UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerUsuarios(){
        return usuarioRepository.findAll();
    }
    
    public Usuario buscarPorId(Integer id){
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario guardar(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public boolean eliminar(Integer id){
        Usuario usuario = buscarPorId(id);
        if(usuario == null){
            return false;
        }
        usuarioRepository.deleteById(id);
        return true;
    }
}
