package com.example.demo.service;

import java.util.List;

import com.example.demo.model.User;
import com.example.demo.model.Admin;
import com.example.demo.model.Supervisor;
import com.example.demo.model.SupervisorRequest;

public interface AdminService {
    
	 public Admin loginAdmin(String username,String password);
    // === USERS ===
    List<User> displayAllUsers();
    String deleteUser(int id);
    long displayUserCount();

    // === SUPERVISORS ===
    List<Supervisor> displayAllSupervisors();
    String deleteSupervisor(int id);
    long displaySupervisorCount();

    // === REQUESTS ===
    List<SupervisorRequest> displayAllRequests();
    String deleteRequest(int id);
    long displayRequestCount();
}
