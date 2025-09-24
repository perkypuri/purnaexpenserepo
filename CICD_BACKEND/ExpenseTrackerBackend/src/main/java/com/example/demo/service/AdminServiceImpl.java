package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.model.Admin;
import com.example.demo.model.Supervisor;
import com.example.demo.model.SupervisorRequest;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.SupervisorRepository;
import com.example.demo.repository.SupervisorRequestRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private SupervisorRepository supervisorRepo;

    @Autowired
    private SupervisorRequestRepository requestRepo;
    @Autowired
    private AdminRepository adminRepository;
    @Override
	public Admin loginAdmin(String username, String password) 
	{
		return adminRepository.findByUsernameAndPassword(username, password);
	}
    // === USERS ===
    @Override
    public List<User> displayAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public String deleteUser(int id) {
        userRepo.deleteById(id);
        return "User deleted with id: " + id;
    }

    @Override
    public long displayUserCount() {
        return userRepo.count();
    }

    // === SUPERVISORS ===
    @Override
    public List<Supervisor> displayAllSupervisors() {
        return supervisorRepo.findAll();
    }

    @Override
    public String deleteSupervisor(int id) {
        supervisorRepo.deleteById(id);
        return "Supervisor deleted with id: " + id;
    }

    @Override
    public long displaySupervisorCount() {
        return supervisorRepo.count();
    }

    // === REQUESTS ===
    @Override
    public List<SupervisorRequest> displayAllRequests() {
        return requestRepo.findAll();
    }

    @Override
    public String deleteRequest(int id) {
        requestRepo.deleteById(id);
        return "Request deleted with id: " + id;
    }

    @Override
    public long displayRequestCount() {
        return requestRepo.count();
    }
}
