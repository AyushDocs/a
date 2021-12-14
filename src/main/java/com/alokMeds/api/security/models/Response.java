package com.alokMeds.api.security.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Response {
    private boolean success;
    private String errorMessage;

    public static final Response generateFailureResponse(String errorMessage) {
        return new Response(false, errorMessage);
    }
    public static final Response SUCCESS_RESPONSE=new Response(true, null);
}
