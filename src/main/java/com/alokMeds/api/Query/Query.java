package com.alokMeds.api.Query;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NonNull;
@Data
@Entity
@Table(name = "query_tbl")
public class Query{
	@Id
	@Column(unique = true)
	private String id;
	private String email;
	@Column(columnDefinition="text")
	private String query;
	private LocalDateTime date;
	
	public Query() {
		this.date =LocalDateTime.now();
		this.id=UUID.randomUUID().toString().substring(0, 18);
	}
	
	public Query(@NonNull String query,@NonNull String email) {
		this();
		this.query = query;
		this.email = email;
	}
}
