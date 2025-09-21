package com.example.demo.service;

import com.example.demo.model.Supervisor;
import com.example.demo.repository.SupervisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupervisorServiceImpl implements SupervisorService {

    @Autowired
    private SupervisorRepository supervisorRepository;

    @Override
    public String registerSupervisor(Supervisor supervisor) {
        if (supervisorRepository.existsByEmail(supervisor.getEmail())) {
            return "Email already exists";
        }
        if (supervisorRepository.existsByMobile(supervisor.getMobile())) {
            return "Mobile number already exists";
        }
        supervisorRepository.save(supervisor);
        return "Supervisor registered successfully";
    }

    @Override
    public Supervisor checkSupervisorLogin(String email, String password) {
        Supervisor supervisor = supervisorRepository.findByEmailAndStatus(email, "ACTIVE");
        if (supervisor != null && supervisor.getPassword().equals(password)) {
            return supervisor;
        }
        return null;
    }

    @Override
    public String updateSupervisorProfile(Supervisor supervisor) {
        Optional<Supervisor> existing = supervisorRepository.findById(supervisor.getId());
        if (existing.isPresent()) {
            supervisorRepository.save(supervisor);
            return "Profile updated successfully";
        }
        return "Supervisor not found";
    }

    @Override
    public List<Supervisor> getAllSupervisors() {
        return supervisorRepository.findAll();
    }

    @Override
    public Supervisor getSupervisorById(int id) {
        return supervisorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Supervisor> getSupervisorsByStatus(String status) {
        return supervisorRepository.findByStatus(status);
    }

    @Override
    public String deleteSupervisor(int id) {
        Optional<Supervisor> supervisor = supervisorRepository.findById(id);
        if (supervisor.isPresent()) {
            supervisorRepository.deleteById(id);
            return "Supervisor deleted successfully";
        }
        return "Supervisor not found";
    }
}
