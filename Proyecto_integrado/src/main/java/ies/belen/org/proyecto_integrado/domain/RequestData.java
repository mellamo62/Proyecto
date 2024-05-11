package ies.belen.org.proyecto_integrado.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestData {
    private Cliente cliente;
    private Peluqueria peluqueria;
    private String fecha;
    private String hora;

}

