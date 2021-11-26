package com.alokMeds.api.Utils;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

public class Role {
    private static final String ATTRIBUTE_NAME="roles";
    private Role(){}
    public static boolean hasUserRole(HttpServletRequest request) {
        return ((List<String>)request.getAttribute(ATTRIBUTE_NAME)).contains("USER");
    }
    public static boolean hasAdminRole(HttpServletRequest request) {
        return ((List<String>)request.getAttribute(ATTRIBUTE_NAME)).contains("ADMIN");
    }
    public static boolean hasRootRole(HttpServletRequest request) {
        return  ((List<String>)request.getAttribute(ATTRIBUTE_NAME)).contains("ROOT");
    }
}
