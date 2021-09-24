
package com.alokMeds.api.Query;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
public class QueryRestController{
    @Autowired
    private QueryRepository queryRepository;
   @PostMapping("/")
   public Query save(@RequestBody QueryRecieved[] queryParam){
      Query q=QueryRecieved.queryRecievedToQuery(queryParam[0]);
      queryRepository.save(q);
      return queryRepository.findByEmailAndQuery(q.getEmail(),q.getQuery());
   }
    //@PostMapping("/")
    //public Query save(@RequestBody Map<String,Object> map){
    //    Query q=new Query((String)map.get("email"),(String)map.get("query"));
    //    queryRepository.save(q);
    //    return queryRepository.findByEmailAndQuery(q.getEmail(),q.getQuery());
    //}
    @GetMapping("/")
    public Page<Query> findAll(@RequestParam Optional<Integer> offset,@RequestParam Optional<Integer> size,
    @RequestParam Optional<String> sortBy){
     return queryRepository.findWithPagination(offset, size, sortBy);
    }
    @PutMapping("/")
    public void update(@RequestBody QueryRecieved query){
    Query q=QueryRecieved.queryRecievedToQuery(query);
    q.setDoubtSolved(true);
    queryRepository.save(q);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        queryRepository.deleteById(id);
    }
    @GetMapping("/id/{id}")
    public void findById(@PathVariable String id){
        queryRepository.findById(id);
    }
    @GetMapping("/trial")
    public QueryRecieved tri(){
       return new QueryRecieved("email","query");
    }
}