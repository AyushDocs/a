package com.alokMeds.api.Query;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface QueryRepository extends JpaRepository<Query,String> {
    Query findByEmailAndQuery(String email, String query);
    default Page<Query> findWithPagination(Optional<Integer> offset,
                                           Optional<Integer> size,
                                           Optional<String> sortBy){
        return 
        findAll(PageRequest.of(offset.orElse(0), 
                               size.orElse(10),
                               Sort.Direction.DESC,
                               sortBy.orElse("id")));
}

}