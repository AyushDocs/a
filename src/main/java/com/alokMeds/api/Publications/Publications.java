package com.alokMeds.api.Publications;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Document
@Entity
@Table(name = "publ_tbl")
@NoArgsConstructor
@AllArgsConstructor
public class Publications {
    @Id
    @javax.persistence.Id
    @Column(unique = true)
    @Indexed(unique = true)
    private String id;
    private String name;
    private String author;
    private String link;     
}