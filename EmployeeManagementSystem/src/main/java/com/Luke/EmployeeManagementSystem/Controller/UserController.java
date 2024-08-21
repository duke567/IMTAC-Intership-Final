package com.Luke.EmployeeManagementSystem.Controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.Luke.EmployeeManagementSystem.Service.UserService;
import com.Luke.EmployeeManagementSystem.DTO.authRequest;
import com.Luke.EmployeeManagementSystem.DTO.authResponse;
import com.Luke.EmployeeManagementSystem.Entity.AppUser;
import com.Luke.EmployeeManagementSystem.Entity.Employee;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public ResponseEntity<AppUser> saveAppUser(@RequestBody AppUser appUser) {
        AppUser savedAppUser = userService.saveAppUser(appUser);
        return ResponseEntity.ok(savedAppUser);
    }
    
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody Map<String, Object> userDetails) {
        try {
            // Create and populate AppUser entity
            AppUser appUser = new AppUser();
            appUser.setUsername((String) userDetails.get("username"));
            appUser.setPassword((String) userDetails.get("password")); // No encoding for simplicity
            appUser.setRole((String) userDetails.get("role"));

            // Create and populate Employee entity
            Employee employee = new Employee();
            employee.setFirst_name((String) userDetails.get("firstName"));
            employee.setLast_name((String) userDetails.get("lastName"));
            employee.setEmail((String) userDetails.get("email"));
            employee.setDepartment((String) userDetails.get("department"));
            employee.setPosition((String) userDetails.get("position"));
            employee.setPhone_number((String) userDetails.get("phoneNumber"));
            employee.setDate_of_birth((String) userDetails.get("dateOfBirth"));
            employee.setJoining_date((String) userDetails.get("joiningDate"));
            employee.setAppUser(appUser);

            // Set the Employee in AppUser entity
            appUser.setEmployee(employee);

            // Save both entities via the service
            userService.saveUser(appUser);

            // Prepare success response
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle error and return appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error registering user: " + e.getMessage()));
        }
    }

  
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody authRequest authRequest) {
        Optional<AppUser> userOpt = userService.findByUsername(authRequest.getUsername());

        if (userOpt.isPresent()) {
            AppUser user = userOpt.get();
            if (authRequest.getPassword().equals(user.getPassword())) {

       
                Employee employee = user.getEmployee();
                Long employeeId = (employee != null) ? employee.getid() : null;

                // Return authResponse with the role and employeeId
                return ResponseEntity.ok(new authResponse("dummy-token", user.getRole(), employeeId));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }

}