package com.alokMeds.api.Query;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueryDto {
    @NonNull
	private String email;
	private String query;

    public Query toQuery(){
     return new Query(email, query);
    }
}
