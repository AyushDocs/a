package com.alokMeds.api.UserPublications;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPublicationRepository extends JpaRepository<UserPublication,Long> {
    
}
