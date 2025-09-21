package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "supervisor_requests")
public class SupervisorRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "supervisor_id", nullable = false)
    private Supervisor supervisor;

    @Column(nullable = false)
    private String status;

    public SupervisorRequest() {}

    public SupervisorRequest(User user, Supervisor supervisor, String status) {
        this.user = user;
        this.supervisor = supervisor;
        this.status = status;
    }

    // Getters & setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Supervisor getSupervisor() { return supervisor; }
    public void setSupervisor(Supervisor supervisor) { this.supervisor = supervisor; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
