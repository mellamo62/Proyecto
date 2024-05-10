package ies.belen.org.proyecto_integrado.controller;

import ies.belen.org.proyecto_integrado.domain.Cliente;
import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.domain.RequestData;
import ies.belen.org.proyecto_integrado.service.ClienteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
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
    public Cliente newCita(@RequestBody RequestData requestData){
        Cliente cliente = requestData.getCliente();
        Peluqueria peluqueria = requestData.getPeluqueria();
        return this.clienteService.cita(cliente, peluqueria);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCliente(@PathVariable("id") Long id){
        this.clienteService.delete(id);
    }
}
