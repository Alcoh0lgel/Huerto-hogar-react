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

    // devuelve false si el correo ya existe
     public boolean registrar(Usuario usuario){
        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            return false;
        }
        usuario.setId_usuario(0); // siempre crea uno nuevo
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuarioRepository.save(usuario);
        return true;
    }

    // devuelve null si las credenciales no son validas
    public AuthResponse login(LoginRequest request){
        Usuario usuario = usuarioRepository.findByCorreo(request.getCorreo()).orElse(null);
        if (usuario == null || !passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            return null;
        }
        String token = jwtService.generarToken(usuario.getCorreo());
        return new AuthResponse(token, "Bearer", jwtService.getExpiracionSegundos());
    }

}