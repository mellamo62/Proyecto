package ies.belen.org.proyecto_integrado.service;

import ies.belen.org.proyecto_integrado.domain.Citas;
import ies.belen.org.proyecto_integrado.domain.Cliente;
import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.exceptions.ClienteNotFoundException;
import ies.belen.org.proyecto_integrado.repository.CitaRepository;
import ies.belen.org.proyecto_integrado.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CitaService {

    public final CitaRepository citaRepository;

    public CitaService(CitaRepository citaRepository){
        this.citaRepository = citaRepository;
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

    public List<Citas> getAllPeluqueria(Long id){
        List<Citas> citas = this.citaRepository.findAll();
        List<Citas> citasToSend =new ArrayList<>();
        citas.forEach((cita)->{
            if (Objects.equals(cita.getPeluqueria().getIdPeluqueria(), id)){
                citasToSend.add(cita);
            }
        });

        return citasToSend;
    }

    public Citas newCita(Cliente cliente, Peluqueria peluqueria, String fecha, String hora) throws ParseException {
        Citas cita = new Citas();
        cita.setCliente(cliente);
        cita.setPeluqueria(peluqueria);
        cita.setFecha(fecha);
        cita.setHora(hora);
        return citaRepository.save(cita);
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

    public List<Citas> all(){
        return this.citaRepository.findAll();
    }
}
