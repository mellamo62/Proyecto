package ies.belen.org.proyecto_integrado.commands;

import ies.belen.org.proyecto_integrado.domain.Cliente;
import ies.belen.org.proyecto_integrado.domain.Horarios;
import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.repository.ClienteRepository;
import ies.belen.org.proyecto_integrado.repository.HorariosRepository;
import ies.belen.org.proyecto_integrado.repository.PeluqueriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

//Esta clase se ejecuta al iniciar springboot y lo que hace es introducir datos a la base de datos automaticamente.
@Component
public class DBOperationRunner implements CommandLineRunner {

    @Autowired
    PeluqueriaRepository peluqueriaRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    HorariosRepository horariosRepository;

    @Override
    public void run(String... args) throws Exception {
        Peluqueria peluqueria1 = new Peluqueria(1L, "Alonso","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "29120 Alhaurín el Grande, Málaga", "https://lh5.googleusercontent.com/p/AF1QipNpO3k8IdRS5uh7di28MemRObEMJQUOuQ0B1y3E=w426-h240-k-no","https://lh5.googleusercontent.com/p/AF1QipNpO3k8IdRS5uh7di28MemRObEMJQUOuQ0B1y3E=w426-h240-k-no");
        Peluqueria peluqueria2 = new Peluqueria(2L, "Daniel Veiga Vitale, Hair & Beauty","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. Muro de Prta Nueva, 7, Distrito Centro, 29005 Málaga", "https://lh5.googleusercontent.com/p/AF1QipOjgyULuZqVOkdPq5F-UY1zmMULeaKH7Rfox-yx=w408-h408-k-no/p/AF1QipNpO3k8IdRS5uh7di28MemRObEMJQUOuQ0B1y3E=w426-h240-k-no","https://lh5.googleusercontent.com/p/AF1QipOjgyULuZqVOkdPq5F-UY1zmMULeaKH7Rfox-yx=w408-h408-k-no/p/AF1QipNpO3k8IdRS5uh7di28MemRObEMJQUOuQ0B1y3E=w426-h240-k-no");

        peluqueriaRepository.saveAll(List.of(
                peluqueria1,
                peluqueria2,
                new Peluqueria(3L, "Peluquería El Recorte","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. Alcalde Joaquín Alonso, 27, Carretera de Cádiz, 29003 Málaga", "https://lh5.googleusercontent.com/p/AF1QipM3nE35dUeF6C2qVcUiFBnAdGqizmS7wYVJHOwl=w408-h510-k-no", "https://lh5.googleusercontent.com/p/AF1QipM3nE35dUeF6C2qVcUiFBnAdGqizmS7wYVJHOwl=w408-h510-k-no"),

                new Peluqueria(4L, "JR Peluquería","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. Berruguete, n° 10, local 6, Carretera de Cádiz, 29004 Málaga", "https://lh5.googleusercontent.com/p/AF1QipMOc8uvs8WnoWgNM_KN58tTMwcFXDAkqEAVT2Vq=w408-h544-k-no","https://lh5.googleusercontent.com/p/AF1QipMOc8uvs8WnoWgNM_KN58tTMwcFXDAkqEAVT2Vq=w408-h544-k-no"),

                new Peluqueria(5L, "Barbería peluquería Nani","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. José Calderón, 26, Campanillas, 29590 Málaga", "https://lh5.googleusercontent.com/p/AF1QipPvFsDxYIt7OeywZE1sglChJtm6S4meCkWxMQAc=w426-h240-k-no","https://lh5.googleusercontent.com/p/AF1QipPvFsDxYIt7OeywZE1sglChJtm6S4meCkWxMQAc=w426-h240-k-no")
        ));

        horariosRepository.saveAll(List.of(
                new Horarios(1, "09:00:00", peluqueria1),

                new Horarios(2, "10:00:00", peluqueria1),

                new Horarios(3, "11:00:00", peluqueria1),

                new Horarios(3, "11:00:00", peluqueria2)
        ));

        clienteRepository.saveAll(List.of(
                new Cliente(1,"mellamo621", "Jose Carlos", "Garcia Vega","1234", "/assets/files/clientes/persona.jpg"),

                new Cliente(2,"crinisitian", "Cristian", "Prieto Ortega","1234", "/assets/files/clientes/persona.jpg"),

                new Cliente(3,"YagoJ3", "Yago", "Morales Silva","1234", "/assets/files/clientes/persona.jpg")
        ));

        System.out.println("ALL DATA SAVED");
    }


}
