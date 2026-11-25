package Huerto_Hogar.Detalle_boleta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Huerto_Hogar.Detalle_boleta.models.entities.Boleta;
import Huerto_Hogar.Detalle_boleta.models.entities.Usuario;
import Huerto_Hogar.Detalle_boleta.repository.BoletaRepository;
import Huerto_Hogar.Detalle_boleta.repository.UsuarioRepository;

import java.util.List;

@Service
public class BoletaService {
@Autowired
    private BoletaRepository boletaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Boleta> obtenerTodo(){
        return boletaRepository.findAll();
    }

    public Boleta obtenerPorId(int id){
        return boletaRepository.findById(id).orElse(null);
    }

    public Boleta guardar(Boleta boleta) {
        Usuario usuario = usuarioRepository.findById(boleta.getUsuario().getId_usuario()).orElse(null);
        if (usuario == null) {
            return null;
        }
        boleta.setUsuario(usuario);
        return boletaRepository.save(boleta);
    }

    public Boleta actualizar(int id, Boleta boleta) {
        Boleta existente = boletaRepository.findById(id).orElse(null);
        if (existente == null) {
            return null;
        }
        Usuario usuario = usuarioRepository.findById(boleta.getUsuario().getId_usuario()).orElse(null);
        if (usuario == null) {
            return null;
        }

        existente.setFechaEmision(boleta.getFechaEmision());
        existente.setMontoTotal(boleta.getMontoTotal());
        existente.setNombreEmisor(boleta.getNombreEmisor());
        existente.setRutEmisor(boleta.getRutEmisor());
        existente.setUsuario(usuario);

        return boletaRepository.save(existente);
    }

    public boolean eliminar(int id){
        if (!boletaRepository.existsById(id)) {
            return false;
        }
        boletaRepository.deleteById(id);
        return true;
    }
    public List<Boleta> obtenerPorCorreo(String correo) {
        return boletaRepository.findByUsuarioCorreoOrderByIdBoletaDesc(correo);
    }

}
