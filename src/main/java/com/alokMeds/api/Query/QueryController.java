
package com.alokMeds.api.Query;

import java.util.Optional;

import com.alokMeds.api.security.JwtUtil;

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
@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/api/query")
@AllArgsConstructor
public class QueryController {
    private JwtUtil jwtUtil;
    private QueryRepository queryRepository;

    @PostMapping("/")
    public void save(@RequestBody QueryRecieved[] queryParam) {
        queryRepository.save(QueryRecieved.queryRecievedToQuery(queryParam[0]));
    }

    @GetMapping("/")
    public ResponseEntity<Page<Query>> findAll(@RequestHeader("email") String email,
    @RequestHeader("Authorization") String jwtToken,@RequestParam Optional<Integer> offset,
     @RequestParam Optional<Integer> size,@RequestParam Optional<String> sortBy) {
     if(jwtUtil.validateToken(jwtToken, email))
        return ResponseEntity.ok(queryRepository.findWithPagination(offset, size, sortBy));
    return ResponseEntity.badRequest().build();                  
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<Query> findById(@RequestHeader("email") String email,
    @RequestHeader("Authorization") String jwtToken,@PathVariable String id) {
    if(jwtUtil.validateToken(jwtToken, email))
        return ResponseEntity.ok(queryRepository.findById(id).get());
    return ResponseEntity.badRequest().build(); 
        
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins={"*","http://localhost:3000"}, allowedHeaders = "*")
    public ResponseEntity<Void> delete(@RequestHeader("email") String email,@RequestHeader("Authorization") String jwtToken,@PathVariable String id) {
    if(!jwtUtil.validateToken(jwtToken, email)) return ResponseEntity.badRequest().build();
    queryRepository.deleteById(id);
    return ResponseEntity.ok().build();
    }

    @DeleteMapping("/")
    public ResponseEntity<Void> deleteAll(@RequestHeader("email") String email,@RequestHeader("Authorization") String jwtToken) {
    if(!jwtUtil.validateToken(jwtToken, email))return ResponseEntity.badRequest().build(); 
    queryRepository.deleteAll();
    return ResponseEntity.ok().build();
    }
    @GetMapping("/check")
    public ResponseEntity<Boolean> check(@RequestHeader("email") String email,@RequestHeader("Authorization") String jwtToken) {
    if(!jwtUtil.validateToken(jwtToken, email))return ResponseEntity.badRequest().build(); 
    return ResponseEntity.ok(true);
    }
}