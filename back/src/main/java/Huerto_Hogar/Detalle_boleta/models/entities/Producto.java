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
@Table (name ="productos") 

public class Producto {
      @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_producto;
    
    @Column(nullable = false)
    private String nombre;

    /*@Column(nullable = false)
    private String imagen;
    
    -- aqui no lo se!!!!!!!!!
    
    */

    @Column(nullable = false)
    private int precio;

    @Column(nullable = false)
    private int stock;

    @Column(nullable = false)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "idCategoria", nullable = false)
    private Categoria categoria;

    }
