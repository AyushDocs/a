package com.alokMeds.api.Publications;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicationRepo extends JpaRepository<Publications,Long> {
    @Query(value="SELECT id FROM publ_tbl WHERE name=:name ",nativeQuery = true)
    Long findIdByName(@Param("name") String name);
    @Transactional
    Long deleteByName(String name);
}

