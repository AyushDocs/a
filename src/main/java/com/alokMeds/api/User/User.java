package com.alokMeds.api.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.alokMeds.api.Publications.Publications;
import com.alokMeds.api.Utils.Roles;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Data
@Entity
@Table(name = "usr_tbl")
public class User implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    private String password;

    @JsonIgnore
    private String roles;

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
        this.roles = Roles.USER;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(roles.split(",")).map(SimpleGrantedAuthority::new).toList();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
