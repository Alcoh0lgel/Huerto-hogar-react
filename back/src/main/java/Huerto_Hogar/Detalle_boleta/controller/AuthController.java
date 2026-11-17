package Huerto_Hogar.Detalle_boleta.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Huerto_Hogar.Detalle_boleta.models.dto.LoginRequest;
import org.springframework.web.bind.annotation.*;;

@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
@RestController
public class AuthController {

    @Autowired
    private AuthService authservice;

    @PostMapping("/acceder")
    public ResponseEntity<Map<String,String >> acceder(@RequestBody LoginRequest request){
        if (! authservice.acceder(request)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("mensaje", "El usuario ya existe"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("mensaje","Usuario ya registrado"));
    }
    
}
