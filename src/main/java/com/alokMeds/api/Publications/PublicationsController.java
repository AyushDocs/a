package com.alokMeds.api.Publications;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RequestMapping("/api/publications")
@RestController
@CrossOrigin(origins={"http://localhost:3000", "http://localhost:8080","https://alokmeds.herokuapp.com/"},allowedHeaders = "*")
@AllArgsConstructor
public class PublicationsController {
  private PublicationRepo repository;
  @GetMapping("/")
  public Page<Publications> findAllWithPagination(Optional<Integer> page, Optional<Integer> offset,
      Optional<String> sort) {
    return repository.findAll(PageRequest.of(offset.orElse(0), page.orElse(1), Sort.Direction.ASC, sort.orElse("id")));
  }

  @PostMapping("/")//
  public Publications add(@RequestBody Publications publication){
    return repository.save(publication);
  }
}