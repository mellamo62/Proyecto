package ies.belen.org.proyecto_integrado.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Lombok;
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
    private Long idPeluqueria;
    private String nombre;
    private String descripcion;
    private String direccion;

    @Column(name = "url_imagen")
    private String urlImagen;

    @Column(name = "url_imagen2")
    private String urlImagen2;

    public Peluqueria(Long idPeluqueria, String nombre, String descripcion, String direccion, String urlImagen, String urlImagen2) {
        this.idPeluqueria = idPeluqueria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.urlImagen = urlImagen;
        this.urlImagen2 = urlImagen2;
    }

    @ManyToMany(
            mappedBy = "peluquerias")
    @JsonIgnore
    Set<Cliente> clientes = new HashSet<>();

    @OneToMany(mappedBy = "peluqueria")
    private Set<Citas> citas = new HashSet<>();

}
