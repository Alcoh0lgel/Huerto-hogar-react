package Huerto_Hogar.Detalle_boleta.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data 
@Table (name ="usuarios") 
public class Usuario {
    private String run;
    private String nombre;
    private String apellido;
    private String correo;
    private String password;
    private String telefono;
    private String direccion;

}
