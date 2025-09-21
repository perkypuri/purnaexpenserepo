package com.example.demo.controller;

import com.example.demo.model.Supervisor;
import com.example.demo.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supervisors")
@CrossOrigin("*")
public class SupervisorController {

    @Autowired
    private SupervisorService supervisorService;

    @PostMapping("/register")
    public String registerSupervisor(@RequestBody Supervisor supervisor) {
        return supervisorService.registerSupervisor(supervisor);
    }

    @PostMapping("/login")
    public Supervisor loginSupervisor(@RequestParam String email, @RequestParam String password) {
        return supervisorService.checkSupervisorLogin(email, password);
    }

    @PutMapping("/update")
    public String updateSupervisor(@RequestBody Supervisor supervisor) {
        return supervisorService.updateSupervisorProfile(supervisor);
    }

    @GetMapping("/all")
    public List<Supervisor> getAllSupervisors() {
        return supervisorService.getAllSupervisors();
    }

    @GetMapping("/{id}")
    public Supervisor getSupervisorById(@PathVariable int id) {
        return supervisorService.getSupervisorById(id);
    }

    @GetMapping("/status/{status}")
    public List<Supervisor> getSupervisorsByStatus(@PathVariable String status) {
        return supervisorService.getSupervisorsByStatus(status);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteSupervisor(@PathVariable int id) {
        return supervisorService.deleteSupervisor(id);
    }
}
