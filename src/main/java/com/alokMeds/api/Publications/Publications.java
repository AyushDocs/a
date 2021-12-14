package com.alokMeds.api.Publications;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "publ_tbl")
@AllArgsConstructor
public class Publications implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String author;
    @Column(unique = true)
    private String link;
    private String description;
    private String imgUrl;
    private LocalDateTime createdDateTime;

    public Publications(String name, String link, String author, String imgUrl, String description) {
        this();
        this.name = name;
        this.author = author;
        this.link = link;
        this.imgUrl = imgUrl;
        this.description = description;
    }

    Publications() {
        this.createdDateTime = LocalDateTime.now();
    }
}