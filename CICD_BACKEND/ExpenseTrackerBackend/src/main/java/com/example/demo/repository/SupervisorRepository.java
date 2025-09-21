package com.example.demo.repository;

import com.example.demo.model.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupervisorRepository extends JpaRepository<Supervisor, Integer> {

    Supervisor findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);

    List<Supervisor> findByStatus(String status);

    Supervisor findByEmailAndStatus(String email, String status);
}
