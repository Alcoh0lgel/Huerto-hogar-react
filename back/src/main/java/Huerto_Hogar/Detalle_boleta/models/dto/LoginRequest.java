package Huerto_Hogar.Detalle_boleta.models.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String correo;
    private String password;
}