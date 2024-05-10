package ies.belen.org.proyecto_integrado.repository;

import ies.belen.org.proyecto_integrado.domain.Citas;
import ies.belen.org.proyecto_integrado.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitaRepository extends JpaRepository<Citas, Long> {
}