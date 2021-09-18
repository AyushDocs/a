package com.alokMeds.api.Query;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="table_query")
public class Query{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String email;
	private String query;
	public Query(String query,String email) {
		this.query = query;
		this.email = email;
	}
}
