package com.alokMeds.api.Query;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@CrossOrigin(origins ="http://localhost:3000",allowedHeaders="*",allowCredentials = "true")
@RestController
@AllArgsConstructor
@RequestMapping("/api")
class QueryController {
    QueryRepository repository;
    
    @GetMapping("/auth/admin/query")
    public ResponseEntity<Page<Query>> findAll(Optional<Integer> offset, Optional<Integer> size,
    Optional<String> sortBy) {
        try {
            Page<Query> items = repository.findWithPagination(offset, size, sortBy);
            if (items.isEmpty())
             return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/auth/admin/query/{id}")
    public ResponseEntity<Query> findById(@PathVariable String id) {
        return ResponseEntity.of(repository.findById(id));
    }
    
    @PostMapping("/query")
    public ResponseEntity<Void> save(@RequestBody QueryDto dto) {
        try {
            repository.save(dto.toQuery());
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
    }
    @DeleteMapping("/auth/admin/query/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        try {
            repository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
    }
}