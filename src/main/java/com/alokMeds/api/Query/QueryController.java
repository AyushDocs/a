package com.alokMeds.api.Query;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/query")
public class QueryController {
    @Autowired
    private QueryRepository queryRepository;
    @PostMapping("/")
    public Query save(QueryRecieved queryParam){
        Query q=QueryRecieved.queryRecievedToQuery(queryParam);
        queryRepository.save(q);
        return queryRepository.findByEmailAndQuery(queryParam.getEmail(),queryParam.getQuery());
    }
    @PostMapping("/form")
    public void save(@Autowired HttpServletRequest req,@Autowired HttpServletResponse res) 
    throws ServletException, IOException{
        final String email = req.getParameter("email");
        final String query = req.getParameter("query");
        queryRepository.save(new Query(query,email));
        req.getRequestDispatcher(req.getRequestURI()).forward(req, res);
    }
}
