package com.alokMeds.api.User;

import java.util.List;

public class ListOfUser {
    private List<User> listOfUsers;
    
    public ListOfUser() {
    }
    public ListOfUser(List<User> listOfUsers) {
        this.listOfUsers = listOfUsers;
    }
    public List<User> getListOfUsers() {
        return listOfUsers;
    }
    public void setListOfUsers(List<User> listOfUsers) {
        this.listOfUsers = listOfUsers;
    }
    public static ListOfUser from(List<User> listOfUsers) {
       return  new ListOfUser(listOfUsers);
    }

}
