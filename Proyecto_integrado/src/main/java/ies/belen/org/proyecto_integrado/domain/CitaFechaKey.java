package ies.belen.org.proyecto_integrado.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class CitaFechaKey implements Serializable {

    @Column(name = "id_cliente")
    Long idCliente;

    @Column(name = "id_peluqueria")
    Long idPeluqueria;

}
