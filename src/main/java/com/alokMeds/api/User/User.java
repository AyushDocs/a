package com.alokMeds.api.User;

import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name="table_usr")
public class User implements UserDetails {
	private static final long serialVersionUID = 1L;
	@Autowired
	private static UserRepository userRepository;
	@Id
	private String email;
	@Column(unique = true, nullable = false)
	private String username;
	private String password;
	private String role = "user";
	private boolean loggedIn;
	

	public User() {
	
	}

	public User(String username, String password, String role, String email) {
		this.username = username;
		this.password = password;
		this.role = role;
		this.email = email;
	}

	public static User setLoggedIn(String username, boolean b) {
		User u = userRepository.findByUsername(username);
		u.setLoggedIn(b);
		return u;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role));
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return isLoggedIn();
	}
	@Override
	public String getUsername() {
		return username;
	}

	public static UserRepository getUserRepository() {
		return userRepository;
	}

	public static void setUserRepository(UserRepository userRepository) {
		User.userRepository = userRepository;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isLoggedIn() {
		return loggedIn;
	}

	public void setLoggedIn(boolean loggedIn) {
		this.loggedIn = loggedIn;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [email=" + email + ", username=" + username + ", password=" + password + ", role=" + role
				+ ", loggedIn=" + loggedIn + "]";
	}
	
}
