package com.alokMeds.api.frontend.models;

import com.alokMeds.api.Publications.Publications;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicationPageItem {
    private String imgUrl;
    private String name;
    String link;
    public static PublicationPageItem from(Publications publication){
        return new PublicationPageItem(publication.getImgUrl(),publication.getName(),publication.getLink());
    }
}
