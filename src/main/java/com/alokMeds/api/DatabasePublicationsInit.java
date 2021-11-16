package com.alokMeds.api;

import javax.annotation.PostConstruct;

import com.alokMeds.api.Publications.PublicationRepo;
import com.alokMeds.api.Publications.Publications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@Component
public class DatabasePublicationsInit {
    @Autowired
    private PublicationRepo publicationRepo;

    @PostConstruct
    public void save() {
        publicationRepo.save(new Publications("Name1","link1","authour1","imgUrl1","desc1"));
        publicationRepo.save(new Publications("Name2","link2","authour2","imgUrl2","desc2"));
        publicationRepo.save(new Publications("Name3","link3","authour3","imgUrl3","desc3"));
        publicationRepo.save(new Publications("Name4","link4","authour4","imgUrl4","desc4"));
        publicationRepo.save(new Publications("Name5","link5","authour4","imgUrl4","desc4"));
        publicationRepo.save(new Publications("Name6","link6","authour4","imgUrl4","desc4"));
        publicationRepo.save(new Publications("Name7","link7","authour4","imgUrl4","desc4"));
        publicationRepo.save(new Publications("Name8","link8","authour8","imgUrl8","desc8"));
    }
}