package com.alokMeds.api.react;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ReactController {

    @GetMapping("")
    public ModelAndView home() {
        return new ModelAndView("index");
    }

}