package com.alokMeds.api.Query;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueryRecieved {
	private String email;
	private String query;

    public static Query queryRecievedToQuery(QueryRecieved queryr){
     Query query = new Query();
     query.setEmail(queryr.getEmail());
     query.setQuery(queryr.getQuery());
     return query;
    }
}
