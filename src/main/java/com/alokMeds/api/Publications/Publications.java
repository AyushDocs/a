package com.alokMeds.api.Publications;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity
@Table(name = "publ_tbl")
@NoArgsConstructor
@AllArgsConstructor
public class Publications {
    @Id
    @Column(unique= true)
    private String name;
    private static final String AUTHOR="Alok Dubey";
    private String author=AUTHOR;
    private String link;     
}