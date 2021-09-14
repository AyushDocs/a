package com.alokMeds.api.Publications;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface PublicationRepository extends JpaRepository<Publications,Long> {
    default Page<Publications> findPublicationsWithPagination(int offset,int pagesize){
        return this.findAll(PageRequest.of(offset, pagesize));
    }
}
