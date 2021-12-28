package com.alokMeds.api.Publications;

import java.util.Optional;

import com.alokMeds.api.Utils.Roles;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/publications")
@AllArgsConstructor
class PublicationController {
    PublicationRepo repository;

    @GetMapping("{id}")
    @Secured(Roles.ADMIN)
    public ResponseEntity<Publications> getById(@PathVariable("id") Long id) {
        Optional<Publications> existingItemOptional = repository.findById(id);

        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(existingItemOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    @Secured(Roles.ADMIN)
    public ResponseEntity<Void> create(@RequestBody PublicationDto dto) {
        try {
            repository.save(dto.toPublication());
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("{id}")
    @Secured(Roles.ADMIN)
    public ResponseEntity<Void> update(@PathVariable("id") Long id, @RequestBody PublicationDto item) {
        try {
            Publications publ = item.toPublication();
            publ.setId(id);
            repository.save(publ);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
           return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("{id}")
    @Secured(Roles.ADMIN)
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Long id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
    
}