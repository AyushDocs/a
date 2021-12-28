package com.alokMeds.api.Query;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends JpaRepository<Query, String> {
    // default Mono<Page<Query>> findAll(Pageable pageable) {
    //     return count()
    //             .flatMap(userCount -> {
    //                 return findAll(pageable.getSort())
    //                         .buffer(pageable.getPageSize(),(pageable.getPageNumber() + 1))
    //                         .elementAt(pageable.getPageNumber(), new ArrayList<>())
    //                         .map(query -> new PageImpl<Query>(query, pageable, userCount));
    //             });
    // }
    default Page<Query> findWithPagination(Optional<Integer> offset, Optional<Integer> size, Optional<String> sortBy) {
        return findAll(PageRequest.of(offset.orElse(0), size.orElse(10), Sort.Direction.DESC, sortBy.orElse("id")));
    }
    // default Mono<Page<Query>> findWithPagination(Optional<Integer> offset, Optional<Integer> size, Optional<String> sortBy) {
    //     return findAll(PageRequest.of(offset.orElse(0), size.orElse(10), Sort.Direction.DESC, sortBy.orElse("id")));
    // }
}