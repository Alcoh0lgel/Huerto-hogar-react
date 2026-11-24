package Huerto_Hogar.Detalle_boleta.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Huerto_Hogar.Detalle_boleta.models.entities.Boleta;

@Repository
public interface BoletaRepository extends JpaRepository<Boleta, Integer>  {
    
}