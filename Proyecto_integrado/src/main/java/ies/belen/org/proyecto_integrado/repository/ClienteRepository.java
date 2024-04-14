package ies.belen.org.proyecto_integrado.repository;

import ies.belen.org.proyecto_integrado.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository  extends JpaRepository<Cliente, Long> {
}