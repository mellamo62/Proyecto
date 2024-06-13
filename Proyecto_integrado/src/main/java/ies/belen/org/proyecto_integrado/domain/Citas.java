package ies.belen.org.proyecto_integrado.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name = "citas")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Citas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_peluqueria")
    private Peluqueria peluqueria;

    @Column(name = "fecha")
    private String fecha;

    @Column(name = "hora")
    private String hora;
}