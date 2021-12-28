package com.alokMeds.api.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {
    @GetMapping("/repassword")
    public String repassword(){
        return "repassword.html";
    }
}
