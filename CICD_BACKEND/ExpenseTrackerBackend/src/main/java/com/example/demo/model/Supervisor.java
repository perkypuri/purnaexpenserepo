package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "supervisor_table")
public class Supervisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supervisor_id")
    private int id;

    @Column(name = "supervisor_name", length = 50, nullable = false)
    private String name;

    @Column(name = "supervisor_email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "supervisor_password", length = 100, nullable = false)
    private String password;

    @Column(name = "supervisor_mobile", length = 15, nullable = false, unique = true)
    private String mobile;

    @Column(name = "supervisor_status", length = 20, nullable = false)
    private String status = "ACTIVE";  

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
