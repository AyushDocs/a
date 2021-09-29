package com.alokMeds.api.Publications;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/publications")
@RestController
public class PublicationsController {
  @Autowired
  private PublicationRepository repository;

  @GetMapping("/")
  @CrossOrigin(origins={"*","http://localhost:3000"},allowedHeaders="*")
  public Page<Publications> findAllWithPagination(Optional<Integer> page, Optional<Integer> offset,
      Optional<String> sort) {
    return repository.findAll(PageRequest.of(page.orElse(1), offset.orElse(1), Sort.Direction.DESC, sort.orElse("id")));
  }
}