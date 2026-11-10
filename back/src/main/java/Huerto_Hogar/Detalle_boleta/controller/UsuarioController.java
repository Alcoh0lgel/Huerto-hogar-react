package Huerto_Hogar.Detalle_boleta.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Huerto_Hogar.Detalle_boleta.models.entities.Usuario;
import Huerto_Hogar.Detalle_boleta.service.UsuarioService;

@RestController 
@RequestMapping("/usuarios") 
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("")
    public List<Usuario> obtenerTodosLosUsuarios(){
        return usuarioService.obtenerUsuarios();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("")
    public ResponseEntity<Usuario> guardar(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.guardar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Integer id, @RequestBody Usuario usuario) {
        Usuario usuarioExistente = usuarioService.buscarPorId(id);
        if (usuarioExistente == null) {
            return ResponseEntity.notFound().build();
        }
        usuario.setId_usuario(id); 
        Usuario usuarioActualizado = usuarioService.guardar(usuario);
        
        return ResponseEntity.ok(usuarioActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        boolean eliminado = usuarioService.eliminar(id);
        if (!eliminado) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "No se encontró el usuario para eliminar"));
        }
        return ResponseEntity.ok(Map.of("mensaje", "Usuario eliminado con éxito"));
    }



}
