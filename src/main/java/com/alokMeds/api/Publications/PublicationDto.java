package com.alokMeds.api.Publications;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PublicationDto {
    private String name;
    private String author;
    private String link;
    private String description;
    private String imgUrl;
    public Publications toPublication(){
      return new Publications(name,link,author,imgUrl,description);
    }
}