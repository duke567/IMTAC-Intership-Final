package com.Luke.EmployeeManagementSystem.Repository;

import com.Luke.EmployeeManagementSystem.Entity.AppUser;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
}

