package com.alokMeds.api.User;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.alokMeds.api.UserPublications.UserPublication;

import lombok.Data;
@Data
@Entity
@Table(name="usr_tbl")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uuid;
    @Column(unique = true)
    private String email;
    private String password;
    private String roles;
    @OneToMany
    private List<UserPublication> userPublications;

    public User(String email,String password){
    this.email = email;
    this.password = password;
    this.uuid=UUID.randomUUID().toString();
    this.roles="USER";
}
public User(){
    this.uuid=UUID.randomUUID().toString();
    this.roles="USER";
    }
}
