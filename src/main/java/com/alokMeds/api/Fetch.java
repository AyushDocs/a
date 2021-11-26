package com.alokMeds.api;

import java.util.function.Consumer;
import java.util.function.Function;

public class Fetch{
    private boolean success;
    private boolean failure;
    private Exception exception;

    public Fetch If(Function<Void,Boolean> condition){
        try {
            if(Boolean.TRUE.equals(condition.apply(null))) success=true;
            failure=true;
        } catch (Exception e) {
           exception=e;
        }
        return this;
    }
    public Fetch then(Consumer<Void> statement){
        try {
            if(success) statement.accept(null);
        } catch (Exception e) {
            exception=e;
        }
        return this;
    }
    public Fetch catchError(Consumer<Exception> statement){
    if(exception!=null) statement.accept(exception);
    return this;
    }

    public Fetch not(Consumer<Boolean> statement){
    if(failure) statement.accept(failure);
    return this;
    }
}
class Main{
    public static void main(String[] args) {
        Fetch fetch = new Fetch();
        fetch.If(condition->true)
        // .then(isTrue->Sys)
       ;
    }
}