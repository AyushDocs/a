package com.alokMeds.api.User;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class UserRecieved {
    private String email;
    private String password;
    private String username;
}
