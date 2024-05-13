package ies.belen.org.proyecto_integrado.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class RequestFileCliente {
    private Cliente cliente;
    private MultipartFile file;
}
