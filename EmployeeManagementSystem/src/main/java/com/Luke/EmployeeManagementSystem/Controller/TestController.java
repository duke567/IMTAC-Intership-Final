package com.Luke.EmployeeManagementSystem.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    @PostMapping("/echo")
    public String echo(@RequestBody String body) {
        return body;
    }
}

