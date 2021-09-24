package com.alokMeds.api.Publications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/publications")
public class PublicationsController {
    @Autowired
    private PublicationRepository publicationRepository;
    @GetMapping("/")
    public ListOfPublications getPublications(@RequestParam("offset") int offset,@RequestParam("size") int size){
        return ListOfPublications.from(publicationRepository.findPublicationsWithPagination(offset,size));
    }
    
}
