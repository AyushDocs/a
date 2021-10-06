package com.alokMeds.api.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Data
@Document
@Entity
@Table(name = "usr_tbl")
public class User {
    @Id
    @javax.persistence.Id
    @Column(unique = true)
    @Indexed(unique = true)
    private String email;
    private String password;
    public User(String email,String password){
    this.email = email;
    this.password = password;
    }
}
