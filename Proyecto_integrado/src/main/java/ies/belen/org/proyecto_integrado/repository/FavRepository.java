package ies.belen.org.proyecto_integrado.repository;

import ies.belen.org.proyecto_integrado.domain.Citas;
import ies.belen.org.proyecto_integrado.domain.Fav;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavRepository extends JpaRepository<Fav, Long> {
}