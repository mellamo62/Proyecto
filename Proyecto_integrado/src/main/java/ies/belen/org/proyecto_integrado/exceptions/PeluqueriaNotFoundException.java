package ies.belen.org.proyecto_integrado.exceptions;

public class PeluqueriaNotFoundException extends RuntimeException{
    public PeluqueriaNotFoundException(Long id) {
        super("Not found Peluqueria with id: " + id);
    }
}
