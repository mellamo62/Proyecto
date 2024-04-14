package ies.belen.org.proyecto_integrado.service;

import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.exceptions.PeluqueriaNotFoundException;
import ies.belen.org.proyecto_integrado.repository.PeluqueriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeluqueriaService {

    private final PeluqueriaRepository peluqueriaRepository;

    public PeluqueriaService(PeluqueriaRepository peluqueriaRepository){
        this.peluqueriaRepository = peluqueriaRepository;
    }

    public List<Peluqueria> all(){
        return this.peluqueriaRepository.findAll();
    }

    public Peluqueria one(Long id){
        return this.peluqueriaRepository.findById(id)
                .orElseThrow(() -> new PeluqueriaNotFoundException(id));
    }
}
