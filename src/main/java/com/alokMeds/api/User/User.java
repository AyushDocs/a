package com.alokMeds.api.User;

import org.springframework.data.annotation.Id;

import lombok.Data;
@Data
public class User {
    @Id
    private String email;
    private String password;
    private boolean isLoggedIn;
    public User(String email,String password){
    this.email = email;
    this.password = password;
    }
}
