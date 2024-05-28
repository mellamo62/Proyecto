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
        Peluqueria peluqueria1 = new Peluqueria(1L, "Alonso","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "29120 Alhaurín el Grande, Málaga", "assets/files/peluquerias/Alonso.jpg","assets/files/peluquerias/Alonso.jpg",36.64249787625064, -4.695516934918495);
        Peluqueria peluqueria2 = new Peluqueria(2L, "Daniel Veiga Vitale, Hair & Beauty","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. Muro de Prta Nueva, 7, Distrito Centro, 29005 Málaga", "assets/files/peluquerias/Daniel_Veiga.png","assets/files/peluquerias/Daniel_Veiga.png",36.721134797649256, -4.424599032583397);

        peluqueriaRepository.saveAll(List.of(
                peluqueria1,
                peluqueria2,
                new Peluqueria(3L, "Peluquería El Recorte","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. Alcalde Joaquín Alonso, 27, Carretera de Cádiz, 29003 Málaga", "assets/files/peluquerias/El_recorte.jpeg", "assets/files/peluquerias/El_recorte.jpeg", 36.69889345872411, -4.4526208489312635),

                new Peluqueria(4L, "JR Peluquería","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. Berruguete, n° 10, local 6, Carretera de Cádiz, 29004 Málaga", "assets/files/peluquerias/JR_peluqueria.jpg","assets/files/peluquerias/JR_peluqueria.jpg", 36.69651456185324, -4.453999834766973),

                new Peluqueria(5L, "Barbería peluquería Nani","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. José Calderón, 26, Campanillas, 29590 Málaga", "assets/files/peluquerias/nani.jpeg","assets/files/peluquerias/nani.jpeg", 36.722867766942, -4.537212402893763)
        ));

        horariosRepository.saveAll(List.of(
                new Horarios(1, "09:00:00", peluqueria1),
                new Horarios(2, "10:00:00", peluqueria1),
                new Horarios(3, "11:00:00", peluqueria1),
                new Horarios(4, "12:00:00", peluqueria1),
                new Horarios(5, "13:00:00", peluqueria1),
                new Horarios(6, "14:00:00", peluqueria1),
                new Horarios(7, "17:00:00", peluqueria1),
                new Horarios(8, "18:00:00", peluqueria1),
                new Horarios(9, "19:00:00", peluqueria1),

                new Horarios(10, "11:00:00", peluqueria2)
        ));

        clienteRepository.saveAll(List.of(
                new Cliente(1,"mellamo621", "Jose Carlos", "Garcia Vega","1234", "/assets/files/clientes/persona.jpg"),

                new Cliente(2,"crinisitian", "Cristian", "Prieto Ortega","1234", "/assets/files/clientes/persona.jpg"),

                new Cliente(3,"YagoJ3", "Yago", "Morales Silva","1234", "/assets/files/clientes/persona.jpg")
        ));

        System.out.println("ALL DATA SAVED");
    }


}
