package com.alokMeds.api.Publications;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Publications {
    @Id
    private Long id;
    private static final String AUTHOR="Alok Dubey";
    private String author=AUTHOR;
    private String link;    
}
