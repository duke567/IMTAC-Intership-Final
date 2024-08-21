package com.Luke.EmployeeManagementSystem.DTO;


public class authResponse {
    private String token;
    private String role;
    private Long employeeId;

    // Constructors
    public authResponse() {
    }

    public authResponse(String token, String role, Long employeeId) {
        this.token = token;
        this.role = role;
        this.employeeId = employeeId;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
}

