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
        Peluqueria peluqueria1 = new Peluqueria(1L, "Alonso", "En Alonso, te ofrecemos una experiencia de belleza integral con servicios de peluquería de alta calidad. Nuestro equipo se dedica a brindar cortes y peinados que destacan tu estilo único en un ambiente moderno y acogedor.", "29120 Alhaurín el Grande, Málaga", "assets/files/peluquerias/Alonso.jpg", "assets/files/peluquerias/Alonso.jpg", 36.64249787625064, -4.695516934918495);
        Peluqueria peluqueria2 = new Peluqueria(2L, "Daniel Veiga Vitale, Hair & Beauty", "Daniel Veiga Vitale, Hair & Beauty es sinónimo de elegancia y sofisticación. Ofrecemos una amplia gama de servicios de peluquería y belleza, realizados por profesionales apasionados por resaltar tu belleza natural con un toque de lujo.", "C. Muro de Prta Nueva, 7, Distrito Centro, 29005 Málaga", "assets/files/peluquerias/Daniel_Veiga.png", "assets/files/peluquerias/Daniel_Veiga.png", 36.721134797649256, -4.424599032583397);
        Peluqueria peluqueria3 = new Peluqueria(3L, "Peluquería El Recorte", "Peluquería El Recorte es tu destino para cortes precisos y peinados a la moda. Con un enfoque en la satisfacción del cliente, nuestro equipo experto se asegura de que salgas con un look que te encante.", "C. Alcalde Joaquín Alonso, 27, Carretera de Cádiz, 29003 Málaga", "assets/files/peluquerias/El_recorte.jpeg", "assets/files/peluquerias/El_recorte.jpeg", 36.69889345872411, -4.4526208489312635);
        Peluqueria peluqueria4 = new Peluqueria(4L, "JR Peluquería", "En JR Peluquería, nos especializamos en ofrecer estilos contemporáneos y cuidados personalizados. Disfruta de un servicio amable y profesional en un entorno relajado que te hará sentir como en casa.", "C. Berruguete, n° 10, local 6, Carretera de Cádiz, 29004 Málaga", "assets/files/peluquerias/JR_peluqueria.jpg", "assets/files/peluquerias/JR_peluqueria.jpg", 36.69651456185324, -4.453999834766973);
        Peluqueria peluqueria5 = new Peluqueria(5L, "Barbería peluquería Nani", "Barbería peluquería Nani combina tradición y modernidad para ofrecerte lo mejor en cortes y arreglos masculinos. Nuestro equipo experto se asegura de que cada visita sea una experiencia única y satisfactoria.", "C. José Calderón, 26, Campanillas, 29590 Málaga", "assets/files/peluquerias/nani.jpeg", "assets/files/peluquerias/nani.jpeg", 36.722867766942, -4.537212402893763);
        Peluqueria peluqueria6 = new Peluqueria(6L, "Peluquería de Caballeros Isa Bernal", "Peluquería de Caballeros Isa Bernal es el lugar perfecto para el cuidado masculino. Con servicios especializados y atención al detalle, te ayudamos a mantener un look impecable y a la moda.", "C. Felix Gancedo, 8, Puerto de la Torre, 29010 Málaga", "assets/files/peluquerias/Isa.jpg", "assets/files/peluquerias/Isa.jpg", 36.723243781467, -4.491283105314604);
        Peluqueria peluqueria7 = new Peluqueria(7L, "Peluqueria Caballeros Juan Martin", "Peluqueria Caballeros Juan Martin se dedica a ofrecer cortes clásicos y modernos para caballeros. Nuestro compromiso es brindarte un servicio de alta calidad en un ambiente cómodo y profesional.", "Cam. del Pato, 24, Carretera de Cádiz, 29004 Málaga", "assets/files/peluquerias/Juan.png", "assets/files/peluquerias/Juan.png", 36.692279280013786, -4.4521442160681675);
        Peluqueria peluqueria8 = new Peluqueria(8L, "Ondas peluqueria", "Ondas peluqueria te invita a descubrir tu estilo con nuestros servicios de peluquería personalizados. Desde cortes modernos hasta tratamientos capilares, nuestro equipo está aquí para cuidar de tu cabello con dedicación.", "C. de Antígona, 15, Puerto de la Torre, 29010 Málaga", "assets/files/peluquerias/Ondas.jpg", "assets/files/peluquerias/Ondas.jpg", 36.72434451180853, -4.4754901617058955);
        Peluqueria peluqueria9 = new Peluqueria(9L, "Peluquería y Estética Y-2", "En Peluquería y Estética Y-2, combinamos lo mejor de la peluquería y la estética para ofrecerte una experiencia de belleza completa. Nuestro equipo de expertos está listo para resaltar tu belleza con servicios de alta calidad.", "Av. Antonio Gaudi, 1, Local 1, Carretera de Cádiz, 29004 Málaga", "assets/files/peluquerias/Y-2.jpg", "assets/files/peluquerias/Y-2.jpg", 36.69971189821794, -4.456950734287699);
        Peluqueria peluqueria10 = new Peluqueria(10L, "Peluquería Bernardo Torres", "Peluquería Bernardo Torres es tu espacio de confianza para cortes y peinados elegantes. Con un equipo profesional y un ambiente acogedor, te garantizamos un servicio que supera tus expectativas.", "C. Almogía, 14, Cruz de Humilladero, 29007 Málaga", "assets/files/peluquerias/Bernardo.jpg", "assets/files/peluquerias/Bernardo.jpg", 36.7198038974711, -4.454204152447966);


        peluqueriaRepository.saveAll(List.of(
                peluqueria1,
                peluqueria2,
                peluqueria3,
                peluqueria4,
                peluqueria5,
                peluqueria6,
                peluqueria7,
                peluqueria8,
                peluqueria9,
                peluqueria10
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
                new Horarios(45, "19:00:00", peluqueria5),

                new Horarios(46, "09:00:00", peluqueria6),
                new Horarios(47, "10:00:00", peluqueria6),
                new Horarios(48, "11:00:00", peluqueria6),
                new Horarios(49, "12:00:00", peluqueria6),
                new Horarios(50, "13:00:00", peluqueria6),
                new Horarios(51, "14:00:00", peluqueria6),
                new Horarios(52, "17:00:00", peluqueria6),
                new Horarios(53, "18:00:00", peluqueria6),
                new Horarios(54, "19:00:00", peluqueria6),

                new Horarios(55, "09:00:00", peluqueria7),
                new Horarios(56, "10:00:00", peluqueria7),
                new Horarios(57, "11:00:00", peluqueria7),
                new Horarios(58, "12:00:00", peluqueria7),
                new Horarios(59, "13:00:00", peluqueria7),
                new Horarios(60, "14:00:00", peluqueria7),
                new Horarios(61, "17:00:00", peluqueria7),
                new Horarios(62, "18:00:00", peluqueria7),
                new Horarios(63, "19:00:00", peluqueria7),

                new Horarios(64, "09:00:00", peluqueria8),
                new Horarios(65, "10:00:00", peluqueria8),
                new Horarios(66, "11:00:00", peluqueria8),
                new Horarios(67, "12:00:00", peluqueria8),
                new Horarios(68, "13:00:00", peluqueria8),
                new Horarios(69, "14:00:00", peluqueria8),
                new Horarios(70, "17:00:00", peluqueria8),
                new Horarios(71, "18:00:00", peluqueria8),
                new Horarios(72, "19:00:00", peluqueria8),

                new Horarios(73, "09:00:00", peluqueria9),
                new Horarios(74, "10:00:00", peluqueria9),
                new Horarios(75, "11:00:00", peluqueria9),
                new Horarios(76, "12:00:00", peluqueria9),
                new Horarios(77, "13:00:00", peluqueria9),
                new Horarios(78, "14:00:00", peluqueria9),
                new Horarios(79, "17:00:00", peluqueria9),
                new Horarios(80, "18:00:00", peluqueria9),
                new Horarios(81, "19:00:00", peluqueria9),

                new Horarios(82, "09:00:00", peluqueria10),
                new Horarios(83, "10:00:00", peluqueria10),
                new Horarios(84, "11:00:00", peluqueria10),
                new Horarios(85, "12:00:00", peluqueria10),
                new Horarios(86, "13:00:00", peluqueria10),
                new Horarios(87, "14:00:00", peluqueria10),
                new Horarios(88, "17:00:00", peluqueria10),
                new Horarios(89, "18:00:00", peluqueria10),
                new Horarios(90, "19:00:00", peluqueria10)
        ));

        clienteRepository.saveAll(List.of(
                new Cliente(1, "mellamo621", "Jose Carlos", "Garcia Vega", "12345", "/assets/files/clientes/persona.jpg"),

                new Cliente(2, "crinisitian", "Cristian", "Prieto Ortega", "12345", "/assets/files/clientes/persona.jpg"),

                new Cliente(3, "YagoJ3", "Yago", "Morales Silva", "12345", "/assets/files/clientes/persona.jpg")
        ));

        System.out.println("ALL DATA SAVED");
    }


}
