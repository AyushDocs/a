package com.alokMeds.api.User;

import java.util.Arrays;
import java.util.Collection;
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
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Data
@Entity
@Table(name = "usr_tbl")
public class User implements UserDetails {
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
    private boolean isLogedIn;
    
    @OneToMany
    @JsonIgnore
    private List<UserPublication> userPublications;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.uuid = UUID.randomUUID().toString();
        this.roles = "USER";
    }

    public User() {
        this.uuid = UUID.randomUUID().toString();
        this.roles = "USER";
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(roles.split(","))
              .map(SimpleGrantedAuthority::new)
              .toList();
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
        return isLogedIn;
    }
}
