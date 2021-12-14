package com.alokMeds.api.Publications;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true",methods = {RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST,RequestMethod.PUT})
@AllArgsConstructor
@RequestMapping("/api")
class PublicController {
    PublicationRepo repository;
    @GetMapping("/auth/admin/publications/{id}")
    public ResponseEntity<Publications> getById(@PathVariable Long id) {
        Optional<Publications> existingItemOptional = repository.findById(id);
        return ResponseEntity.of(existingItemOptional);
    }

    @PostMapping("/auth/admin/publications/")
    public ResponseEntity<Void> save(@RequestBody PublicationDto dto) {
        try {
            repository.save(dto.toPublication());
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
    }
    @PutMapping("/auth/admin/publications/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Long id, @RequestBody PublicationDto item) {
        Optional<Publications> existingItemOptional = repository.findById(id);
        if (!existingItemOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        Publications existingItem = item.toPublication();
        existingItem.setId(id);
        repository.save(existingItem);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/auth/admin/publications/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long id) {
        try {
            repository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
    }
    @GetMapping("/auth/admin/publications/")
    public ResponseEntity<Page<Publications>> getAll(Optional<Integer> offset,Optional<Integer> size) {
        try {
            Page<Publications> items =repository.findAll(PageRequest.of(offset.orElse(0), size.orElse(3),Direction.DESC,"createdDateTime"));
            if (items.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            return  ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }   
}