package ies.belen.org.proyecto_integrado.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
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
    private long idCliente;
    private String usuario;
    private String password;
    private String nombre;
    private String apellidos;
//    @Lob
//    @Column(columnDefinition = "MEDIUMBLOB")
//    private byte[] image;

    @Lob
    @Column(length = 1000000000)
    private String urlImagen;

    public Cliente(long idCliente, String usuario, String nombre, String apellidos, String urlImagen) {
        this.idCliente = idCliente;
        this.usuario = usuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.urlImagen = urlImagen;
    }

    @ManyToMany
    @JoinTable(
            name = "favs",
            joinColumns = @JoinColumn(name = "id_cliente", referencedColumnName = "id_cliente"),
            inverseJoinColumns = @JoinColumn(name = "id_peluqueria", referencedColumnName = "id_peluqueria"))
    Set<Peluqueria> peluquerias = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    private Set<Citas> citas = new HashSet<>();

}
