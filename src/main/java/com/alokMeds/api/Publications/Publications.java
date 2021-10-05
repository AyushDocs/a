package com.alokMeds.api.Publications;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Publications {
    @Id
    @Indexed(unique = true)
    private String name;
    private static final String AUTHOR="Alok Dubey";
    private String author=AUTHOR;
    private String link;     
}