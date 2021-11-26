package com.alokMeds.api.Publications;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
public class Publications implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private Long id;
    private String name;
    private String author;
    private String link;
    private String description;
    private String imgUrl;
    public Publications(String name,String link,String author,String imgUrl,String description) {
        this.name = name;
        this.author = author;
        this.link = link;
        this.imgUrl = imgUrl;
        this.description = description;
    }     
    
}
