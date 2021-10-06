package com.alokMeds.api.Publications;

import java.util.Optional;

import com.alokMeds.api.security.JwtUtil;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RequestMapping("/api/publications")
@RestController
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*")
public class PublicationsController {
  private PublicationRepo repository;
  private JwtUtil jwtUtil;
  @GetMapping("/")
  public Page<Publications> findAllWithPagination(Optional<Integer> page, Optional<Integer> offset,
      Optional<String> sort) {
    return repository.findAll(PageRequest.of(offset.orElse(0), page.orElse(1), Sort.Direction.DESC, sort.orElse("id")));
  }

  @PostMapping("/")
  public ResponseEntity<Void> add(@RequestHeader("Authorization") String jwtToken,
  @RequestHeader("email") String email,@RequestBody Publications publication){
    if(!jwtUtil.validateToken(jwtToken,email))return ResponseEntity.badRequest().build(); 
    repository.save(publication);
    return ResponseEntity.ok().build();
  }
}