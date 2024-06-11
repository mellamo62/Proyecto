package ies.belen.org.proyecto_integrado.service;

import ies.belen.org.proyecto_integrado.domain.Citas;
import ies.belen.org.proyecto_integrado.domain.Cliente;
import ies.belen.org.proyecto_integrado.domain.Fav;
import ies.belen.org.proyecto_integrado.domain.Peluqueria;
import ies.belen.org.proyecto_integrado.exceptions.ClienteNotFoundException;
import ies.belen.org.proyecto_integrado.repository.CitaRepository;
import ies.belen.org.proyecto_integrado.repository.ClienteRepository;
import ies.belen.org.proyecto_integrado.repository.FavRepository;
import ies.belen.org.proyecto_integrado.repository.PeluqueriaRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PeluqueriaRepository peluqueriaRepository;
    private final FavRepository favRepository;

    public ClienteService(ClienteRepository clienteRepository, PeluqueriaRepository peluqueriaRepository,FavRepository favRepository){
        this.clienteRepository = clienteRepository;
        this.peluqueriaRepository = peluqueriaRepository;
        this.favRepository = favRepository;
    }

    public Cliente save(Cliente cliente){

        return this.clienteRepository.save(cliente);
    }

    public Fav fav(Long idCliente, Long idPeluqueria){
        Cliente cliente = this.clienteRepository.findById(idCliente).orElse(null);
        Peluqueria peluqueria = this.peluqueriaRepository.findById(idPeluqueria).orElse(null);
        Fav fav = new Fav();
        fav.setPeluqueria(peluqueria);
        fav.setCliente(cliente);

        return favRepository.save(fav);

    }

    public void deleteFav(Long idPeluqueria, Long idCliente){
        List<Fav> favs = this.favRepository.findAll();
        favs.forEach((fav)->{
            if (Objects.equals(fav.getCliente().getIdCliente(), idCliente) && Objects.equals(fav.getPeluqueria().getIdPeluqueria(), idPeluqueria)){
                this.favRepository.delete(fav);
            }
        });
    }

    public List<Fav> getFavCliente(Long id){
        List<Fav> favs = favRepository.findAll();
        favs = favs.stream().filter(f ->f.getCliente().getIdCliente() == id).collect(Collectors.toList());

        return favs;
    }


    public Cliente one(Long id){
        return this.clienteRepository.findById(id)
                .orElseThrow(() -> new ClienteNotFoundException(id));
    }

    public List<Cliente> all(){
        return this.clienteRepository.findAll();
    }

    public Cliente replace(Long id, Cliente cliente){
        return this.clienteRepository.findById(id).map(p->(id.equals(cliente.getIdCliente()) ? this.clienteRepository.save(cliente) : null))
                .orElseThrow(() -> new ClienteNotFoundException(id));
    }

    public void delete(Long id){
        this.clienteRepository.findById(id).map(p->{this.clienteRepository.delete(p);
                return p;})
                .orElseThrow(()->new ClienteNotFoundException(id));
    }

}
