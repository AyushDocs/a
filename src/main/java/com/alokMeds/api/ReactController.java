package com.alokMeds.api;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController implements ErrorController {

    @GetMapping("*")
    public String error(){
          return "index.html";    
    }
}
