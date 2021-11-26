package com.alokMeds.api.UserPublications;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.alokMeds.api.Publications.Publications;
import com.alokMeds.api.User.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPublication implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Publications publication;
    @ManyToOne
    private User user;
    @Enumerated(EnumType.STRING)
    private Stage stage;
    @Enumerated(EnumType.STRING)
    private Views views;
}
