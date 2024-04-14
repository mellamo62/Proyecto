package ies.belen.org.proyecto_integrado.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cliente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private long idPeluqueria;
    private String nombre;
    private String apellidos;
    private String urlImagen;

    @ManyToMany(
            mappedBy = "clientes")
    @JsonIgnore
    Set<Peluqueria> peluquerias = new HashSet<>();

}
