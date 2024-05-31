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
        Peluqueria peluqueria3 = new Peluqueria(3L, "Peluquería El Recorte","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. Alcalde Joaquín Alonso, 27, Carretera de Cádiz, 29003 Málaga", "assets/files/peluquerias/El_recorte.jpeg", "assets/files/peluquerias/El_recorte.jpeg", 36.69889345872411, -4.4526208489312635);
        Peluqueria peluqueria4 = new Peluqueria(4L, "JR Peluquería","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. Berruguete, n° 10, local 6, Carretera de Cádiz, 29004 Málaga", "assets/files/peluquerias/JR_peluqueria.jpg","assets/files/peluquerias/JR_peluqueria.jpg", 36.69651456185324, -4.453999834766973);
        Peluqueria peluqueria5 = new Peluqueria(5L, "Barbería peluquería Nani","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.", "C. José Calderón, 26, Campanillas, 29590 Málaga", "assets/files/peluquerias/nani.jpeg","assets/files/peluquerias/nani.jpeg", 36.722867766942, -4.537212402893763);


        peluqueriaRepository.saveAll(List.of(
                peluqueria1,
                peluqueria2,
                peluqueria3,
                peluqueria4,
                peluqueria5
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

                new Horarios(10, "09:00:00", peluqueria2),
                new Horarios(11, "10:00:00", peluqueria2),
                new Horarios(12, "11:00:00", peluqueria2),
                new Horarios(13, "12:00:00", peluqueria2),
                new Horarios(14, "13:00:00", peluqueria2),
                new Horarios(15, "14:00:00", peluqueria2),
                new Horarios(16, "17:00:00", peluqueria2),
                new Horarios(17, "18:00:00", peluqueria2),
                new Horarios(18, "19:00:00", peluqueria2),

                new Horarios(19, "09:00:00", peluqueria3),
                new Horarios(20, "10:00:00", peluqueria3),
                new Horarios(21, "11:00:00", peluqueria3),
                new Horarios(22, "12:00:00", peluqueria3),
                new Horarios(23, "13:00:00", peluqueria3),
                new Horarios(24, "14:00:00", peluqueria3),
                new Horarios(25, "17:00:00", peluqueria3),
                new Horarios(26, "18:00:00", peluqueria3),
                new Horarios(27, "19:00:00", peluqueria3),

                new Horarios(28, "09:00:00", peluqueria4),
                new Horarios(29, "10:00:00", peluqueria4),
                new Horarios(30, "11:00:00", peluqueria4),
                new Horarios(31, "12:00:00", peluqueria4),
                new Horarios(32, "13:00:00", peluqueria4),
                new Horarios(33, "14:00:00", peluqueria4),
                new Horarios(34, "17:00:00", peluqueria4),
                new Horarios(35, "18:00:00", peluqueria4),
                new Horarios(36, "19:00:00", peluqueria4),

                new Horarios(37, "09:00:00", peluqueria5),
                new Horarios(38, "10:00:00", peluqueria5),
                new Horarios(39, "11:00:00", peluqueria5),
                new Horarios(40, "12:00:00", peluqueria5),
                new Horarios(41, "13:00:00", peluqueria5),
                new Horarios(42, "14:00:00", peluqueria5),
                new Horarios(43, "17:00:00", peluqueria5),
                new Horarios(44, "18:00:00", peluqueria5),
                new Horarios(45, "19:00:00", peluqueria5)
        ));

        clienteRepository.saveAll(List.of(
                new Cliente(1,"mellamo621", "Jose Carlos", "Garcia Vega","12345", "/assets/files/clientes/persona.jpg"),

                new Cliente(2,"crinisitian", "Cristian", "Prieto Ortega","12345", "/assets/files/clientes/persona.jpg"),

                new Cliente(3,"YagoJ3", "Yago", "Morales Silva","12345", "/assets/files/clientes/persona.jpg")
        ));

        System.out.println("ALL DATA SAVED");
    }


}
