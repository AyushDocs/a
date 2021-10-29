package com.alokMeds.api.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity
@NoArgsConstructor
@Table(name = "usr_tbl")
public class User{
    @Id
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    private String password;
    private String roles;

    public User(String email,String password){
    this.email = email;
    this.password = password;
    }
}
