package ies.belen.org.proyecto_integrado.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "peluqueria")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Peluqueria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_peluqueria")
    private int idPeluqueria;
    private String nombre;
    private String descripcion;
    private String direccion;

    @Column(name = "url_imagen")
    private String urlImagen;

    @Column(name = "url_imagen2")
    private String urlImagen2;

//    @ManyToMany(mappedBy = "fechaCliente")
//    Set<Peluqueria> citas;
//
//    @OneToMany(mappedBy = "peluqueria")
//    Set<CitaFecha> fecha;

}
