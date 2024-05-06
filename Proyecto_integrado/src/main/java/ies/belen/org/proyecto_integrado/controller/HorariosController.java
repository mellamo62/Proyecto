package ies.belen.org.proyecto_integrado.controller;

import ies.belen.org.proyecto_integrado.domain.Cliente;
import ies.belen.org.proyecto_integrado.domain.Horarios;
import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.service.HorariosService;
import ies.belen.org.proyecto_integrado.service.PeluqueriaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/horarios")
public class HorariosController {
    private final HorariosService horariosService;

    public HorariosController(HorariosService horariosService) {
        this.horariosService = horariosService;
    }

    @GetMapping({"","/"})
    public List<Horarios> all(){
        return this.horariosService.all();
    }

    @GetMapping("/{id}")
    public Horarios one(@PathVariable("id") Long id){
        return this.horariosService.one(id);
    }

    @PostMapping({"","/"})
    public Horarios newHorarios(@RequestBody Horarios horarios){
        return this.horariosService.save(horarios);
    }

    @PutMapping("/{id}")
    public Horarios replaceHorarios(@PathVariable("id") Long id, @RequestBody Horarios horarios){
        return this.horariosService.replace(id, horarios);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteHorarios(@PathVariable("id") Long id){
        this.horariosService.delete(id);
    }
}
