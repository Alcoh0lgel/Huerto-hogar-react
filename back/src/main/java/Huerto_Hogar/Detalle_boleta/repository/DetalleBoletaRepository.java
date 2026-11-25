package Huerto_Hogar.Detalle_boleta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Huerto_Hogar.Detalle_boleta.models.entities.DetalleBoleta;

@Repository
public interface DetalleBoletaRepository extends JpaRepository<DetalleBoleta, Integer>  {
    List<DetalleBoleta> findByBoletaIdBoleta(int idBoleta);
}