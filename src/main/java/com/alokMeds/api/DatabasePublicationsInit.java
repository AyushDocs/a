package com.alokMeds.api;

import javax.annotation.PostConstruct;

import com.alokMeds.api.Publications.PublicationRepo;
import com.alokMeds.api.Publications.Publications;

import org.springframework.beans.factory.annotation.Autowired;

public class DatabasePublicationsInit {
    @Autowired
    private PublicationRepo publicationRepo;

    @PostConstruct
    public void save() {
        publicationRepo.save(new Publications("name1","authour1","link1"));
        publicationRepo.save(new Publications("name2","authour2","link2"));
        publicationRepo.save(new Publications("name3","authour3","link3"));
        publicationRepo.save(new Publications("name4","authour4","link4"));
    }
}