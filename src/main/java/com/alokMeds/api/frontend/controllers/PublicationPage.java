package com.alokMeds.api.frontend.controllers;

import java.util.Optional;

import com.alokMeds.api.Publications.PublicationRepo;
import com.alokMeds.api.frontend.models.PublicationPageItem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins ="http://localhost:3000",allowedHeaders="*",allowCredentials = "true")
@RequestMapping("/api")
public class PublicationPage {
    PublicationRepo repository;

    @GetMapping("/publications/public/")
    public ResponseEntity<Page<PublicationPageItem>> findAll(Optional<Integer> offset, Optional<Integer> page,
            Optional<String> sort) {
        try {
            Page<PublicationPageItem> items = repository
                    .findAll(PageRequest.of(offset.orElse(0), page.orElse(1), Sort.Direction.ASC, sort.orElse("id")))
                    .map(PublicationPageItem::from);
            if (items.isEmpty())
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(items);
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
