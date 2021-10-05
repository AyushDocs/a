package com.alokMeds.api.Query;

import java.time.LocalDate;
import java.util.UUID;

import com.mongodb.lang.NonNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Data
@Document
public class Query{
	@Id
	@Indexed(unique=true)
	private String id;
	private String email;
	private String query;
	private LocalDate date;
	private boolean doubtSolved;
	
	public Query() {
		this.date =LocalDate.now();
		this.id=UUID.randomUUID().toString().substring(0, 18);
		doubtSolved=false;
	}
	
	public Query(@NonNull String query,@NonNull String email) {
		this();
		this.query = query;
		this.email = email;
	}
}
