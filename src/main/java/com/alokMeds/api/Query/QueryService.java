package com.alokMeds.api.Query;

import java.util.Optional;

import com.alokMeds.api.security.JwtUtil;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
@AllArgsConstructor
@Service
public class QueryService {
    private JwtUtil jwtUtil;
    private QueryRepo queryRepository;

    public void save(QueryRecieved[] queryParam) {
     queryRepository.save(QueryRecieved.queryRecievedToQuery(queryParam[0]));
    }

    public ResponseEntity<Page<Query>> findAll(String email,String jwtToken
    ,Optional<Integer> offset, Optional<Integer> size,Optional<String> sortBy) {
     if(jwtUtil.validateToken(jwtToken, email))
        return ResponseEntity.ok(queryRepository.findWithPagination(offset, size, sortBy));
    return ResponseEntity.badRequest().build();                  
    }

    public ResponseEntity<Void> delete(String email,String jwtToken,String id) {
    if(!jwtUtil.validateToken(jwtToken, email)) return ResponseEntity.badRequest().build();
    queryRepository.deleteById(id);
    return ResponseEntity.ok().build();
    }
    public ResponseEntity<Void> deleteAll(String email,String jwtToken) {
    if(!jwtUtil.validateToken(jwtToken, email))return ResponseEntity.badRequest().build(); 
    queryRepository.deleteAll();
    return ResponseEntity.ok().build();
    }
    public ResponseEntity<Boolean> check(String email,String jwtToken) {
    if(!jwtUtil.validateToken(jwtToken, email))return ResponseEntity.badRequest().build(); 
    return ResponseEntity.ok(true);
    }
}
