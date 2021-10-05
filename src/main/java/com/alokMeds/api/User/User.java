package com.alokMeds.api.User;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Data
@Document
public class User {
    @Id
    @Indexed(unique = true)
    private String email;
    private String password;
    public User(String email,String password){
    this.email = email;
    this.password = password;
    }
}
