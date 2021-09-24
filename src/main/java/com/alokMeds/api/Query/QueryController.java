package com.alokMeds.api.Query;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@Controller	
@CrossOrigin(origins = "*")
@RequestMapping("/api/query")
public class QueryController {
    @Autowired
	private QueryService queryService;

    @PostMapping("/form")
    public RedirectView save(HttpServletRequest req,RedirectAttributes attributes){
        return queryService.save(req, attributes);
    }
}
