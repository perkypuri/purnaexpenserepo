package com.example.demo.service;

import com.example.demo.model.Supervisor;
import java.util.List;

public interface SupervisorService {

    String registerSupervisor(Supervisor supervisor);

    Supervisor checkSupervisorLogin(String email, String password);

    String updateSupervisorProfile(Supervisor supervisor);

    List<Supervisor> getAllSupervisors();

    Supervisor getSupervisorById(int id);

    List<Supervisor> getSupervisorsByStatus(String status);

    String deleteSupervisor(int id);
}
