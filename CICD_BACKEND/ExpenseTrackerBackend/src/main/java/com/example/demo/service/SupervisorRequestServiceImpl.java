package com.example.demo.service;

import com.example.demo.model.SupervisorRequest;
import com.example.demo.repository.SupervisorRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupervisorRequestServiceImpl implements SupervisorRequestService {

    private final SupervisorRequestRepository repo;

    public SupervisorRequestServiceImpl(SupervisorRequestRepository repo) {
        this.repo = repo;
    }

    @Override
    public SupervisorRequest sendRequest(SupervisorRequest request) {
        // Always start new requests as PENDING
        request.setStatus("PENDING");
        return repo.save(request);
    }

    @Override
    public List<SupervisorRequest> getRequestsByUser(int userId) {
        return repo.findByUser_Id(userId);
    }

    @Override
    public List<SupervisorRequest> getRequestsBySupervisor(int supervisorId) {
        return repo.findBySupervisor_Id(supervisorId);
    }

    @Override
    public SupervisorRequest updateStatus(int requestId, String status) {
        // Find the request by ID, throw descriptive exception if not found
        SupervisorRequest req = repo.findById(requestId)
                .orElseThrow(() -> new RuntimeException(
                        "Supervisor request not found with id: " + requestId));
        
        req.setStatus(status);
        return repo.save(req);
    }
}
