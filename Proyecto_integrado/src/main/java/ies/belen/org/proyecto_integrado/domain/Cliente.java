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

    private String fotoPerfil;

    public Cliente(long idCliente, String usuario, String nombre, String apellidos,String password, String fotoPerfil) {
        this.idCliente = idCliente;
        this.usuario = usuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.fotoPerfil = fotoPerfil;
    }

    @OneToMany(mappedBy = "cliente")
    private Set<Fav> favs = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    private Set<Citas> citas = new HashSet<>();

}
