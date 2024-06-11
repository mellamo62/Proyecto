package ies.belen.org.proyecto_integrado.service;

import ies.belen.org.proyecto_integrado.controller.HorariosController;
import ies.belen.org.proyecto_integrado.domain.Cliente;
import ies.belen.org.proyecto_integrado.domain.Horarios;
import ies.belen.org.proyecto_integrado.exceptions.ClienteNotFoundException;
import ies.belen.org.proyecto_integrado.exceptions.HorariosNotFoundException;
import ies.belen.org.proyecto_integrado.repository.HorariosRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
public class HorariosService {

    private final HorariosRepository horariosRepository;

    public HorariosService(HorariosRepository horariosRepository){
        this.horariosRepository = horariosRepository;
    }

    public List<Horarios> all(){
        return this.horariosRepository.findAll();
    }

    public Horarios one(Long id){
        return this.horariosRepository.findById(id)
                .orElseThrow(() -> new HorariosNotFoundException(id));
    }

    public void delete(Long id){
        this.horariosRepository.findById(id).map(p->{this.horariosRepository.delete(p);
                    return p;})
                .orElseThrow(()->new HorariosNotFoundException(id));
    }
}
