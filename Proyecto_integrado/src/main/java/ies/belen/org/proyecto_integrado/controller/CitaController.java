package ies.belen.org.proyecto_integrado.controller;

import ies.belen.org.proyecto_integrado.domain.Citas;
import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.domain.RequestData;
import ies.belen.org.proyecto_integrado.service.CitaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping({"","/"})
    public Citas newCita(@RequestBody Citas citas){
        return this.citaService.save(citas);
    }

    @PutMapping("/{id}")
    public Citas replaceCita(@PathVariable("id") Long id, @RequestBody Citas citas){
        return this.citaService.replace(id, citas);
    }

//    @PostMapping("/cita")
//    public Citas newCita(@RequestBody RequestData requestData){
//        Cliente cliente = requestData.getCliente();
//        Peluqueria peluqueria = requestData.getPeluqueria();
//        return this.clienteService.cita(cliente, peluqueria);
//    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCita(@PathVariable("id") Long id){
        this.citaService.delete(id);
    }
}
