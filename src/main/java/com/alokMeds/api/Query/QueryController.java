
package com.alokMeds.api.Query;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController

@CrossOrigin(origins={"http://localhost:3000", "http://localhost:8080","https://alokmeds.herokuapp.com/"},allowedHeaders = "*")
@RequestMapping("/api/query")
@AllArgsConstructor
public class QueryController {
    private QueryRepo queryRepo;

    @PostMapping("/")
    public void save(@RequestBody QueryRecieved[] queryParam) {
       queryRepo.save(QueryRecieved.queryRecievedToQuery(queryParam[0]));
    }

    @GetMapping("/auth")//
    public Page<Query> findAll(@RequestParam Optional<Integer> offset,
     @RequestParam Optional<Integer> size,@RequestParam Optional<String> sortBy) {
     return queryRepo.findWithPagination(offset, size, sortBy);         
    }

    @DeleteMapping("/auth/{id}")//
    public void delete(@PathVariable String id) {
    queryRepo.deleteById(id);
    }

    @DeleteMapping("/auth")//
    public void deleteAll() {
     queryRepo.deleteAll();
    }
    @GetMapping("/auth/check/:id")
    public boolean check(@PathVariable String id) { 
    return queryRepo.existsById(id);
    }
}