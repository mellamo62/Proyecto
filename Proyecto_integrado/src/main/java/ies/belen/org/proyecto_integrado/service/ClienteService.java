package ies.belen.org.proyecto_integrado.service;

import ies.belen.org.proyecto_integrado.domain.Cliente;
import ies.belen.org.proyecto_integrado.exceptions.ClienteNotFoundException;
import ies.belen.org.proyecto_integrado.repository.ClienteRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository){
        this.clienteRepository = clienteRepository;
    }

    public Cliente save(Cliente cliente){
        return this.clienteRepository.save(cliente);
    }

    public Cliente one(Long id){
        return this.clienteRepository.findById(id)
                .orElseThrow(() -> new ClienteNotFoundException(id));
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

    public Cliente addProduct(Cliente cliente, MultipartFile file) throws IOException {
        cliente.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
        return clienteRepository.save(cliente);
    }

    //Get Image using product ID
    @GetMapping(value = "/{clienteId}/image")
    public ResponseEntity<byte[]> getClienteImage(@PathVariable Long clienteId) {
        Optional<Cliente> clienteOptional = this.getCliente(clienteId);
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            byte[] imageBytes = java.util.Base64.getDecoder().decode(cliente.getImage());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new byte[0], HttpStatus.NOT_FOUND);
        }
    }

    public Optional<Cliente> getCliente(Long id){
        return clienteRepository.findById(id);
    }

}
