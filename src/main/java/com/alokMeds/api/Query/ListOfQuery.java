package com.alokMeds.api.Query;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListOfQuery {
    private List<Query> listOfQuery;
    public static ListOfQuery fromList(List<Query> queryList) {
    return new ListOfQuery(queryList);
    }
}
