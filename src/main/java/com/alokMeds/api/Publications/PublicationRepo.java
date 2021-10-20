package com.alokMeds.api.Publications;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicationRepo extends JpaRepository<Publications,Long> {
    
}

