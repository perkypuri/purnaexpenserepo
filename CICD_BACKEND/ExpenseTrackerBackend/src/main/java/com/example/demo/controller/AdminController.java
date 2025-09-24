package com.example.demo.controller;

import com.example.demo.model.Admin;
import com.example.demo.model.User;
import com.example.demo.model.Supervisor;
import com.example.demo.model.SupervisorRequest;
import com.example.demo.service.AdminService;
import com.example.demo.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin) {
        try {
            Admin a = adminRepository.findByUsernameAndPassword(admin.getUsername(), admin.getPassword());
            if (a != null) {
                return ResponseEntity.ok(a); // login success
            } else {
                return ResponseEntity.status(401).body("Invalid Username or Password"); // unauthorized
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    // ===== USERS =====
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.displayAllUsers());
    }

    @DeleteMapping("/users")
    public ResponseEntity<String> deleteUser(@RequestParam int id) {
        try {
            return ResponseEntity.ok(adminService.deleteUser(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete user");
        }
    }

    @GetMapping("/users/count")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(adminService.displayUserCount());
    }

    // ===== SUPERVISORS =====
    @GetMapping("/supervisors")
    public ResponseEntity<List<Supervisor>> getAllSupervisors() {
        return ResponseEntity.ok(adminService.displayAllSupervisors());
    }

    @DeleteMapping("/supervisors")
    public ResponseEntity<String> deleteSupervisor(@RequestParam int id) {
        try {
            return ResponseEntity.ok(adminService.deleteSupervisor(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete supervisor");
        }
    }

    @GetMapping("/supervisors/count")
    public ResponseEntity<Long> getSupervisorCount() {
        return ResponseEntity.ok(adminService.displaySupervisorCount());
    }

    // ===== REQUESTS =====
    @GetMapping("/requests")
    public ResponseEntity<List<SupervisorRequest>> getAllRequests() {
        return ResponseEntity.ok(adminService.displayAllRequests());
    }

    @DeleteMapping("/requests")
    public ResponseEntity<String> deleteRequest(@RequestParam int id) {
        try {
            return ResponseEntity.ok(adminService.deleteRequest(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete request");
        }
    }

    @GetMapping("/requests/count")
    public ResponseEntity<Long> getRequestCount() {
        return ResponseEntity.ok(adminService.displayRequestCount());
    }
}
