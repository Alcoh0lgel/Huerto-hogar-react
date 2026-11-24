package Huerto_Hogar.Detalle_boleta.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Huerto_Hogar.Detalle_boleta.models.entities.Usuario;

@Repository 
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    
    Optional<Usuario> findByCorreo(String correo);
}
