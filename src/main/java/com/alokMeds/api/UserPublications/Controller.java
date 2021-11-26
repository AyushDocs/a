package com.alokMeds.api.UserPublications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user/userPublications")
public class Controller {
    @Autowired
    private UsrPublService service;
    @PostMapping("/{id}")
    public void add(@CookieValue String token,@PathVariable("id") Long publicationId){
        service.add(token, publicationId);
    }
}
