package com.example.demo.service;

import com.example.demo.model.User;
import java.util.List;

public interface UserService {

    String registerUser(User user);

    User checkUserLogin(String email, String password);

    String updateUserProfile(User user);

    List<User> getAllUsers();

    User getUserById(int id);

    List<User> getUsersByStatus(String status);

    String deleteUser(int id);
}
