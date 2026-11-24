package Huerto_Hogar.Detalle_boleta.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;

    private String tipo;

    private String rol;
    
    private long expiraEn;
}