package ies.belen.org.proyecto_integrado.exceptions;

public class ClienteNotFoundException extends RuntimeException{
    public ClienteNotFoundException(Long id) {
        super("Not found Cliente with id: " + id);
    }
}
