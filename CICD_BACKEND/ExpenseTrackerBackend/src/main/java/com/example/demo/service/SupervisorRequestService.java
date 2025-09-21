package com.example.demo.service;

import com.example.demo.model.SupervisorRequest;
import java.util.List;

public interface SupervisorRequestService {
    SupervisorRequest sendRequest(SupervisorRequest request);
    List<SupervisorRequest> getRequestsByUser(int userId);
    List<SupervisorRequest> getRequestsBySupervisor(int supervisorId);
    SupervisorRequest updateStatus(int requestId, String status);
}
