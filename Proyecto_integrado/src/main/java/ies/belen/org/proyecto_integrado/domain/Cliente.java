package ies.belen.org.proyecto_integrado.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
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
    private long idCliente;
    private String usuario;
    private String nombre;
    private String apellidos;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image;
//    private String urlImagen;

//    @ManyToMany
//    @JoinTable(
//            name = "citas",
//            joinColumns = @JoinColumn(name = "id_peluqueria"),
//            inverseJoinColumns = @JoinColumn(name = "id_cliente"))
//    Set<Cliente> fechaCliente;
//
//    @OneToMany(mappedBy = "cliente")
//    Set<CitaFecha> fecha;

}
