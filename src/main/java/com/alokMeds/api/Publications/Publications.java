package com.alokMeds.api.Publications;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
    @Column(unique = true)
    private Long id;
    private String name;
    private String author;
    private String link;     
}
