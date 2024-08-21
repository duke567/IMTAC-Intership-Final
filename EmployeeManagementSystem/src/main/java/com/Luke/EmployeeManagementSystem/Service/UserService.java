package com.Luke.EmployeeManagementSystem.Service;


import com.Luke.EmployeeManagementSystem.Entity.AppUser;
import com.Luke.EmployeeManagementSystem.Entity.Employee;
import com.Luke.EmployeeManagementSystem.Repository.EmployeeRepository;
import com.Luke.EmployeeManagementSystem.Repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; 
    
    public Optional<AppUser> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public Optional<Employee> findEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }
    
    public void saveUser(AppUser appUser) {
        userRepository.save(appUser);
    }

    public Optional<AppUser> authenticate(String username, String password) {
      Optional<AppUser> userOpt = userRepository.findByUsername(username);
      if (userOpt.isPresent()) {
        AppUser user = userOpt.get();
        if (passwordEncoder.matches(password, user.getPassword())) {
          return Optional.of(user);
        }
      }
      return Optional.empty();
    }
    public AppUser saveAppUser(AppUser appUser) {
        return userRepository.save(appUser);
    }
  }