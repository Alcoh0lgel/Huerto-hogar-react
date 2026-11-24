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

import Huerto_Hogar.Detalle_boleta.models.entities.DetalleBoleta;
import Huerto_Hogar.Detalle_boleta.service.DetalleBoletaService;

@CrossOrigin(origins = "*")
@RequestMapping("/api/detalleBoleta")
@RestController
public class DetalleBoletaController {

    @Autowired
    private DetalleBoletaService detalleBoletaService;

    @GetMapping("")
    public List<DetalleBoleta> obtenerTodosLosDetallesBoleta(){
        return detalleBoletaService.obtenerTodo();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleBoleta> obtenerDetalleBoletaPorId(@PathVariable int id){
        DetalleBoleta detalle = detalleBoletaService.obtenerPorId(id);
        if (detalle == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(detalle);
    }

    @PostMapping("")
    public ResponseEntity<DetalleBoleta> crearDetalleBoleta(@RequestBody DetalleBoleta detalle){
        return ResponseEntity.status(HttpStatus.CREATED).body(detalleBoletaService.guardar(detalle));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetalleBoleta> actualizarDetalleBoleta(@PathVariable int id, @RequestBody DetalleBoleta detalle){
        DetalleBoleta actualizado = detalleBoletaService.actualizar(id, detalle);
        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDetalleBoleta(@PathVariable int id){
        if (!detalleBoletaService.eliminar(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

}