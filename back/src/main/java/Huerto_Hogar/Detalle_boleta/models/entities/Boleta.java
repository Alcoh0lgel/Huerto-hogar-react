package Huerto_Hogar.Detalle_boleta.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "boleta")

public class Boleta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idBoleta;

    @Column(nullable = false)
    private String fechaEmision;

    @Column(nullable = false)
    private int montoTotal;

    @Column(nullable = false)
    private String nombreEmisor;

    @Column(nullable = false)
    private String rutEmisor;
    
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

}
