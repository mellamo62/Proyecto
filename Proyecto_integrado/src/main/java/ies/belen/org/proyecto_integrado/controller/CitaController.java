package ies.belen.org.proyecto_integrado.controller;

import ies.belen.org.proyecto_integrado.domain.Citas;
import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.domain.RequestData;
import ies.belen.org.proyecto_integrado.service.CitaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/citas")
public class CitaController {

    private final CitaService citaService;

    public CitaController(CitaService citaService) {
        this.citaService = citaService;
    }

    @GetMapping("/{id}")
    public Citas one(@PathVariable("id") Long id){
        return this.citaService.one(id);
    }

    @GetMapping("/cliente/{id}")
    public List<Citas> getAllCliente(@PathVariable("id") Long id){
        return this.citaService.getAllCliente(id);
    }

    @GetMapping("/peluqueria/{id}")
    public List<Citas> getAllPeluqueria(@PathVariable("id") Long id){
        return this.citaService.getAllPeluqueria(id);
    }

    @PostMapping({"","/"})
    public Citas newCita(@RequestBody Citas citas){
        return this.citaService.save(citas);
    }

    @PutMapping("/{id}")
    public Citas replaceCita(@PathVariable("id") Long id, @RequestBody Citas citas){
        return this.citaService.replace(id, citas);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCita(@PathVariable("id") Long id){
        this.citaService.delete(id);
    }
}
