package com.alokMeds.api.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.Data;
@Data
@Entity
@Table(name = "usr_tbl")
@NoArgsConstructor
public class User {
    @Id
    @Column(unique = true)
    private String email;
    private String password;
    public User(String email,String password){
    this.email = email;
    this.password = password;
    }
}
