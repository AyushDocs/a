package com.alokMeds.api.Query;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@Service
public class QueryService {
    @Autowired
	private QueryRepository queryRepository;
    
    public RedirectView save(HttpServletRequest req,RedirectAttributes attributes){
		try{
			String email=req.getParameter("email");
			String query=req.getParameter("query");
			
			Query q=new Query(query,email);
			queryRepository.save(q);
			attributes.addFlashAttribute("Query", q);
			return new RedirectView("http://localhost:3000/#/post/success");
		}
		catch(Exception e){
			return new RedirectView("http://localhost:3000/#/post/failure");
		}
    }
}
