package com.alokMeds.api.Publications;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicationRepo extends JpaRepository<Publications, Long> {
    default Page<Publications> findSomePublications() {
        return findAll(PageRequest.of(0, 3, Direction.DESC, "createdDateTime"));
    }
    

    Publications findByLink(String link);
}
