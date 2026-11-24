package Huerto_Hogar.Detalle_boleta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Huerto_Hogar.Detalle_boleta.models.dto.AuthResponse;
import Huerto_Hogar.Detalle_boleta.models.dto.LoginRequest;
import Huerto_Hogar.Detalle_boleta.models.entities.Usuario;
import Huerto_Hogar.Detalle_boleta.repository.UsuarioRepository;
import Huerto_Hogar.Detalle_boleta.security.JwtService;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public boolean registrar(Usuario usuario){
        String correo = usuario.getCorreo().trim().toLowerCase();

        if (usuarioRepository.findByCorreo(correo).isPresent()) {
            return false;
        }

        usuario.setId_usuario(0);
        usuario.setCorreo(correo);
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        if (correo.endsWith("@admin.cl") || correo.endsWith("@huerthogar.cl")) {
            usuario.setRol("ADMIN");
        } else {
            usuario.setRol("CLIENTE");
        }

        usuarioRepository.save(usuario);
        return true;
    }

    public AuthResponse login(LoginRequest request){
        String correo = request.getCorreo().trim().toLowerCase();
        Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);

        if (usuario == null || !passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            return null;
        }

        String token = jwtService.generarToken(usuario.getCorreo(), usuario.getRol());
        return new AuthResponse(token, "Bearer", usuario.getRol(), jwtService.getExpiracionSegundos());
    }
}