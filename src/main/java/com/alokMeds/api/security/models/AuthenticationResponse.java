package com.alokMeds.api.security.models;

import com.alokMeds.api.Utils.Roles;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor(access= AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Data
public class AuthenticationResponse extends Response {
    private String role;
    private AuthenticationResponse(String role,String errorMessage,boolean success) {
        this.role = role;
        setErrorMessage(errorMessage);
        setSuccess(success);
    }
    public static final AuthenticationResponse USER_SUCCESS_RESPONSE = new AuthenticationResponse(Roles.USER,null,true);
    public static final AuthenticationResponse ADMIN_SUCCESS_RESPONSE = new AuthenticationResponse(Roles.ADMIN,null,true);
}
