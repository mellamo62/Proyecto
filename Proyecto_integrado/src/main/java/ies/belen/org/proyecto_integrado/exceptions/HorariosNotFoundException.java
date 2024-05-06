package ies.belen.org.proyecto_integrado.exceptions;

public class HorariosNotFoundException extends RuntimeException{
    public HorariosNotFoundException(Long id) {
        super("Not found Horarios with id: " + id);
    }
}
