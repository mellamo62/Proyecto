package ies.belen.org.proyecto_integrado.commands;

import ies.belen.org.proyecto_integrado.domain.Cliente;
import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.repository.ClienteRepository;
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

    @Override
    public void run(String... args) throws Exception {
        peluqueriaRepository.saveAll(List.of(
                new Peluqueria(1, "Alonso", "29120 Alhaurín el Grande, Málaga", "https://lh5.googleusercontent.com/p/AF1QipNpO3k8IdRS5uh7di28MemRObEMJQUOuQ0B1y3E=w426-h240-k-no", null),

                new Peluqueria(2, "Daniel Veiga Vitale, Hair & Beauty", "C. Muro de Prta Nueva, 7, Distrito Centro, 29005 Málaga", "https://lh5.googleusercontent.com/p/AF1QipOjgyULuZqVOkdPq5F-UY1zmMULeaKH7Rfox-yx=w408-h408-k-no/p/AF1QipNpO3k8IdRS5uh7di28MemRObEMJQUOuQ0B1y3E=w426-h240-k-no", null),

                new Peluqueria(3, "Peluquería El Recorte", "C. Alcalde Joaquín Alonso, 27, Carretera de Cádiz, 29003 Málaga", "https://lh5.googleusercontent.com/p/AF1QipM3nE35dUeF6C2qVcUiFBnAdGqizmS7wYVJHOwl=w408-h510-k-no", null),

                new Peluqueria(4, "JR Peluquería", "C. Berruguete, n° 10, local 6, Carretera de Cádiz, 29004 Málaga", "https://lh5.googleusercontent.com/p/AF1QipMOc8uvs8WnoWgNM_KN58tTMwcFXDAkqEAVT2Vq=w408-h544-k-no", null),

                new Peluqueria(5, "Barbería peluquería Nani", "C. José Calderón, 26, Campanillas, 29590 Málaga", "https://lh5.googleusercontent.com/p/AF1QipPvFsDxYIt7OeywZE1sglChJtm6S4meCkWxMQAc=w426-h240-k-no", null)
        ));

        clienteRepository.saveAll(List.of(
                new Cliente(1, "Jose Carlos", "Garcia Vega", "https://media.entertainmentearth.com/assets/images/209725448e7648cb9079bb9bced47295xl.jpg", null),

                new Cliente(2, "Cristian", "Prieto Ortega", "https://static.wikia.nocookie.net/theghosttrick/images/6/6c/SisselCat.png/revision/latest?cb=20110322224849", null),

                new Cliente(3, "Yago", "Morales Silva", "https://static.wikia.nocookie.net/hollowknight/images/0/0c/Grub.png/revision/latest/thumbnail/width/360/height/360?cb=20170417120822", null)
        ));

        System.out.println("ALL DATA SAVED");
    }


}
