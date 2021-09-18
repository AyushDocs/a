package com.alokMeds.api.Query;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface QueryRepository extends JpaRepository<Query,Long> {
    Query findByEmailAndQuery(String email, String query);
}
