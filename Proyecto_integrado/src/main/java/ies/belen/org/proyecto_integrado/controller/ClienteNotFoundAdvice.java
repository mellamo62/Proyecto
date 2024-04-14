package ies.belen.org.proyecto_integrado.controller;

import ies.belen.org.proyecto_integrado.exceptions.ClienteNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ClienteNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(ClienteNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String clienteFoundHandler(ClienteNotFoundException clienteNotFoundException){
        return clienteNotFoundException.getMessage();
    }
}