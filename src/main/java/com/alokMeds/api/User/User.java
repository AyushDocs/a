package com.alokMeds.api.User;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.alokMeds.api.Publications.Publications;
import com.alokMeds.api.security.PasswordEncoder;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "usr_tbl")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private String uuid;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    private String password;

    @JsonIgnore
    private String roles;
    @JsonIgnore
    private String salt;

    @JsonIgnore
    @OneToOne
    private Publications firstPublication;
    @OneToOne
    @JsonIgnore
    private Publications secondPublication;
    @OneToOne
    @JsonIgnore
    private Publications thirdPublication;

    public User() {
        this.uuid = UUID.randomUUID().toString();
        this.roles = "USER";
        this.salt = PasswordEncoder.generateSalt();
    }

    public User(String email, String password) {
        this();
        this.email = email;
        this.password = password;
    }

    public void pushPublications(Publications publications) {
        if (publications.equals(firstPublication) || publications.equals(secondPublication)
                || publications.equals(thirdPublication))
            return;
        if (firstPublication == null) {
            firstPublication = publications;
        } else if (secondPublication == null) {
            secondPublication = publications;
        } else if (thirdPublication == null) {
            thirdPublication = publications;
        } else {
            thirdPublication = secondPublication;
            secondPublication = firstPublication;
            firstPublication = publications;
        }
    }

    public List<Publications> findPublications() {
        List<Publications> publications = new ArrayList<>();
        if (firstPublication != null) {
            publications.add(firstPublication);
        }
        if (secondPublication != null) {
            publications.add(secondPublication);
        }
        if (thirdPublication != null) {
            publications.add(thirdPublication);
        }
        return publications;
    }
}
