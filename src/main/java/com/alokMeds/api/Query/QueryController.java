
package com.alokMeds.api.Query;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController

@CrossOrigin(origins={"http://localhost:3000", "http://localhost:8080","https://alokmeds.herokuapp.com/"},allowedHeaders = "*")
@RequestMapping("/api/query")
@AllArgsConstructor
public class QueryController {
    private QueryService queryService;

    @PostMapping("/")
    public void save(@RequestBody QueryRecieved[] queryParam) {
       queryService.save(queryParam);
    }

    @GetMapping("/")
    public ResponseEntity<Page<Query>> findAll(@RequestHeader("email") String email,
    @RequestHeader("Authorization") String jwtToken,@RequestParam Optional<Integer> offset,
     @RequestParam Optional<Integer> size,@RequestParam Optional<String> sortBy) {
     return queryService.findAll(email, jwtToken, offset, size, sortBy);         
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins={"*","http://localhost:3000"}, allowedHeaders = "*")
    public ResponseEntity<Void> delete(@RequestHeader("email") String email,@RequestHeader("Authorization") String jwtToken,@PathVariable String id) {
    return queryService.delete(email,jwtToken,id);
    }

    @DeleteMapping("/")
    public ResponseEntity<Void> deleteAll(@RequestHeader("email") String email,@RequestHeader("Authorization") String jwtToken) {
    return queryService.deleteAll(email,jwtToken);
    }
    @GetMapping("/check")
    public ResponseEntity<Boolean> check(@RequestHeader("email") String email,@RequestHeader("Authorization") String jwtToken) { 
    return queryService.check(email,jwtToken);
    }
}