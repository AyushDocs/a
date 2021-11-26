package com.alokMeds.api;

import java.util.stream.IntStream;

import javax.annotation.PostConstruct;

import com.alokMeds.api.Publications.PublicationRepo;
import com.alokMeds.api.Publications.Publications;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
@Component
@AllArgsConstructor
public class DatabasePublicationsInit {
    private PublicationRepo publicationRepo;
    @PostConstruct
    public void save() {
        IntStream.range(0, 10)
        .forEach(i->publicationRepo.save(new Publications("Name"+i,"link"+i,"authour"+i,"imgUrl"+i,"desc"+i)));
    }
}