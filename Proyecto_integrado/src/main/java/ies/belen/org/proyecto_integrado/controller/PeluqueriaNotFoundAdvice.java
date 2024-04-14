package ies.belen.org.proyecto_integrado.controller;

import ies.belen.org.proyecto_integrado.exceptions.PeluqueriaNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PeluqueriaNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(PeluqueriaNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String peluqueriaFoundHandler(PeluqueriaNotFoundException peluqueriaNotFoundException){
        return peluqueriaNotFoundException.getMessage();
    }

}
