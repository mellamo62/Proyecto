package ies.belen.org.proyecto_integrado.controller;

import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.service.PeluqueriaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/peluquerias")
public class PeluqueriaController {

    private final PeluqueriaService peluqueriaService;

    public PeluqueriaController(PeluqueriaService peluqueriaService) {
        this.peluqueriaService = peluqueriaService;
    }

    //Obtener todas las peluquerias
    @GetMapping({"","/"})
    public List<Peluqueria> all(){
        return this.peluqueriaService.all();
    }

    //Obtener una peluqueria
    @GetMapping("/{id}")
    public Peluqueria one(@PathVariable("id") Long id){
        return this.peluqueriaService.one(id);
    }
}
