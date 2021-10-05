package com.alokMeds.api.Publications;

import org.springframework.data.domain.Page;

public class ListOfPublications {
    private Page<Publications> listOfPublications;
    
    public ListOfPublications() {
    }
    public ListOfPublications(Page<Publications> listOfPublications) {
        this.listOfPublications = listOfPublications;
    }
    public Page<Publications> getListOfPublications() {
        return listOfPublications;
    }
    public void setListOfPublications(Page<Publications> listOfPublications) {
        this.listOfPublications = listOfPublications;
    }
    public static ListOfPublications from(Page<Publications> listOfPublications) {
       return  new ListOfPublications(listOfPublications);
    }

}
