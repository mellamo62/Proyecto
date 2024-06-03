package ies.belen.org.proyecto_integrado.controller;

import ies.belen.org.proyecto_integrado.domain.*;
import ies.belen.org.proyecto_integrado.repository.CitaRepository;
import ies.belen.org.proyecto_integrado.service.ClienteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping({"","/"})
    public List<Cliente> all(){
        return this.clienteService.all();
    }

    @GetMapping("/{id}")
    public Cliente one(@PathVariable("id") Long id){
        return this.clienteService.one(id);
    }

    @PostMapping({"","/"})
    public Cliente newCliente(@RequestBody Cliente cliente){
        return this.clienteService.save(cliente);
    }

    @PutMapping("/{id}")
    public Cliente replaceCliente(@PathVariable("id") Long id, @RequestBody Cliente cliente){
        return this.clienteService.replace(id, cliente);
    }

    @PostMapping("/cita")
    public Citas newCita(@RequestBody RequestData requestData) throws ParseException {
        return this.clienteService.cita(requestData.getCliente(), requestData.getPeluqueria(), requestData.getFecha(), requestData.getHora());
    }

    @PostMapping("/fav/{idCliente}/{idPeluqueria}")
    public Fav newFav(@PathVariable("idCliente") Long idCliente, @PathVariable("idPeluqueria") Long idPeluqueria){
        return this.clienteService.fav(idCliente, idPeluqueria);
    }

    @GetMapping("/fav/{idCliente}")
    public List<Fav> getFav(@PathVariable("idCliente") Long id){
        return this.clienteService.getFavCliente(id);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/fav/{idPeluqueria}/{idCliente}")
    public void deleteFav(@PathVariable("idPeluqueria")Long idPeluqueria, @PathVariable("idCliente") Long idCliente){
        this.clienteService.deleteFav(idPeluqueria, idCliente);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCliente(@PathVariable("id") Long id){
        this.clienteService.delete(id);
    }
}
