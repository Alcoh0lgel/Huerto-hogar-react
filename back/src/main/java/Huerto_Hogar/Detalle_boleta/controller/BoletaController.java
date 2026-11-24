package Huerto_Hogar.Detalle_boleta.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Huerto_Hogar.Detalle_boleta.service.BoletaService;
import Huerto_Hogar.Detalle_boleta.models.entities.Boleta;



@CrossOrigin(origins = "*")
@RequestMapping("/api/boleta")
@RestController
public class BoletaController {

    @Autowired
    private BoletaService boletaService;


    @GetMapping("")
    public List<Boleta> obtenerTodasLasBoletas(){
        return boletaService.obtenerTodo();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Boleta> obtenerBoletaPorId(@PathVariable int id){
        Boleta boleta = boletaService.obtenerPorId(id);
        if (boleta == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(boleta);
    }

    @PostMapping("")
    public ResponseEntity<Boleta> crearBoleta(@RequestBody Boleta boleta){
        return ResponseEntity.status(HttpStatus.CREATED).body(boletaService.guardar(boleta));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boleta> actualizarBoleta(@PathVariable int id, @RequestBody Boleta boleta){
        Boleta actualizado = boletaService.actualizar(id, boleta);
        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarBoleta(@PathVariable int id){
        if (!boletaService.eliminar(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }


}