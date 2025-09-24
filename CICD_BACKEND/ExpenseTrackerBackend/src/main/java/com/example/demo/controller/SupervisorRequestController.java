package com.example.demo.controller;

import com.example.demo.model.SupervisorRequest;
import com.example.demo.service.SupervisorRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supervisorRequests")
@CrossOrigin("*")
public class SupervisorRequestController {

    private final SupervisorRequestService service;

    public SupervisorRequestController(SupervisorRequestService service) {
        this.service = service;
    }

    @PostMapping("/send")
    public ResponseEntity<SupervisorRequest> sendRequest(@RequestBody SupervisorRequest request) {
        SupervisorRequest savedRequest = service.sendRequest(request);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SupervisorRequest>> getRequestsByUser(@PathVariable int userId) {
        List<SupervisorRequest> requests = service.getRequestsByUser(userId);
        if (requests.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @GetMapping("/supervisor/{supervisorId}")
    public ResponseEntity<List<SupervisorRequest>> getRequestsBySupervisor(@PathVariable int supervisorId) {
        List<SupervisorRequest> requests = service.getRequestsBySupervisor(supervisorId);
        if (requests.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<SupervisorRequest> updateStatus(@PathVariable int id, @RequestParam String status) {
        try {
            SupervisorRequest updatedRequest = service.updateStatus(id, status);
            return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
