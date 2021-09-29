
package com.alokMeds.api.Query;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/query")
public class QueryController {
    @Autowired
    private QueryRepository queryRepository;

    @PostMapping("/")
    @CrossOrigin(origins={"*","http://localhost:3000"}, allowedHeaders = "*")
    public void save(@RequestBody QueryRecieved[] queryParam) {
        queryRepository.save(QueryRecieved.queryRecievedToQuery(queryParam[0]));
    }

    @GetMapping("/")
    @CrossOrigin(origins={"*","http://localhost:3000"}, allowedHeaders = "*")
    public Page<Query> findAll(@RequestParam Optional<Integer> offset, @RequestParam Optional<Integer> size,
            @RequestParam Optional<String> sortBy) {
        return queryRepository.findWithPagination(offset, size, sortBy);
    }
    @GetMapping("/id/{id}")
    @CrossOrigin(origins={"*","http://localhost:3000"}, allowedHeaders = "*")
    public Query findById(@PathVariable String id) {
        return queryRepository.findById(id).get();
    }

    @PutMapping("/")
    @Deprecated
    public void update(@RequestBody QueryRecieved query) {
        Query q = QueryRecieved.queryRecievedToQuery(query);
        q.setDoubtSolved(true);
        queryRepository.save(q);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins={"*","http://localhost:3000"}, allowedHeaders = "*")
    public void delete(@PathVariable String id) {
        queryRepository.deleteById(id);
    }

    @DeleteMapping("/")
    public void deleteAll() {
        queryRepository.deleteAll();
    }
}