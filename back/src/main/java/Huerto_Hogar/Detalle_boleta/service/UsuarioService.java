package Huerto_Hogar.Detalle_boleta.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Huerto_Hogar.Detalle_boleta.models.entities.Usuario;
import Huerto_Hogar.Detalle_boleta.repository.UsuarioRepository;

@Service 
public class UsuarioService {

    @Autowired 
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> obtenerUsuarios(){
        return usuarioRepository.findAll();
    }
    
    public Usuario buscarPorId(Integer id){
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario guardar(Usuario usuario){
        if (usuario.getCorreo() != null) {
            usuario.setCorreo(usuario.getCorreo().trim().toLowerCase());
        }
        if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizar(int id, Usuario usuario){
        Usuario existente = usuarioRepository.findById(id).orElse(null);
        if (existente == null) {
            return null;
        }
        existente.setNombre(usuario.getNombre());
        existente.setApellido(usuario.getApellido());
        if (usuario.getCorreo() != null) {
            existente.setCorreo(usuario.getCorreo().trim().toLowerCase());
        }
        if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
            existente.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        existente.setTelefono(usuario.getTelefono());
        existente.setDireccion(usuario.getDireccion());
        return usuarioRepository.save(existente);
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