package ies.belen.org.proyecto_integrado.controller;

import ies.belen.org.proyecto_integrado.domain.Horarios;
import ies.belen.org.proyecto_integrado.service.HorariosService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/horarios")
public class HorariosController {
    private final HorariosService horariosService;

    public HorariosController(HorariosService horariosService) {
        this.horariosService = horariosService;
    }

    //Obtener el horario de una peluquería
    @GetMapping("/one/{id}")
    public List<Horarios> horariosByPeluqueria(@PathVariable("id") Long id){
        List<Horarios> temp = this.horariosService.all().stream()
                .filter(peluqueria -> Objects.equals(peluqueria.getPeluqueria().getIdPeluqueria(), id))
                .toList();
        return temp;
    }
}
