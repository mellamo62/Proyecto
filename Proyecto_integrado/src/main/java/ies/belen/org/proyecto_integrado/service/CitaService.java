package ies.belen.org.proyecto_integrado.service;

import ies.belen.org.proyecto_integrado.domain.Citas;
import ies.belen.org.proyecto_integrado.domain.Cliente;
import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.exceptions.ClienteNotFoundException;
import ies.belen.org.proyecto_integrado.repository.CitaRepository;
import ies.belen.org.proyecto_integrado.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CitaService {

    public final CitaRepository citaRepository;

    public CitaService(CitaRepository citaRepository){
        this.citaRepository = citaRepository;
    }

    public Citas save(Citas citas){
        return this.citaRepository.save(citas);
    }

    public Citas one(Long id){
        return this.citaRepository.findById(id)
                .orElseThrow(() -> new ClienteNotFoundException(id));
    }

    public List<Citas> getAllCliente(Long id){
        List<Citas> citas = this.citaRepository.findAll();
        List<Citas> citasToSend =new ArrayList<>();
        citas.forEach((cita)->{
            if (cita.getCliente().getIdCliente() == id){
                citasToSend.add(cita);
            }
        });

        return citasToSend;
    }

    public Citas replace(Long id, Citas citas){
        return this.citaRepository.findById(id).map(p->(id.equals(citas.getId()) ? this.citaRepository.save(citas) : null))
                .orElseThrow(() -> new ClienteNotFoundException(id));
    }

    public void delete(Long id){
        this.citaRepository.findById(id).map(p->{this.citaRepository.delete(p);
                    return p;})
                .orElseThrow(()->new ClienteNotFoundException(id));
    }
    public Optional<Citas> getCita(Long id){
        return citaRepository.findById(id);
    }

    public List<Citas> all(){
        return this.citaRepository.findAll();
    }
}
