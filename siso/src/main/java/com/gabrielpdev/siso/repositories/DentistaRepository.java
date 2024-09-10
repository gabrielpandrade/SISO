package com.gabrielpdev.siso.repositories;

import com.gabrielpdev.siso.models.Dentista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DentistaRepository extends JpaRepository<Dentista, Long> {

}
