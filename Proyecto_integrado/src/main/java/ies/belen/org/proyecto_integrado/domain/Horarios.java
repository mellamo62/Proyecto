package ies.belen.org.proyecto_integrado.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Horarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Horarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_horarios")
    private long idHorarios;
    private String hora;

    @ManyToOne
    @JoinColumn(name = "id_peluqueria", nullable = false)
    private Peluqueria peluqueria;
}
