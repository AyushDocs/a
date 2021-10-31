package com.alokMeds.api;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController{

    @GetMapping("*")
    public String error(HttpServletRequest request, HttpServletResponse response){
          return error2(request, response);    
    }
    @GetMapping("/*/*")
    public String error2(HttpServletRequest request, HttpServletResponse response){
    String url=request.getRequestURL().toString();
        if(!url.startsWith("/api/")) return "index.html";
    return "redirect:/tftftftft";
    }
}
