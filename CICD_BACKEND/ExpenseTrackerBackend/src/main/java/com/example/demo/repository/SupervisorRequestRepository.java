package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.SupervisorRequest;
import java.util.List;

public interface SupervisorRequestRepository extends JpaRepository<SupervisorRequest, Integer> {
    List<SupervisorRequest> findByUser_Id(int userId);
    List<SupervisorRequest> findBySupervisor_Id(int supervisorId);
}
