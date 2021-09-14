package com.alokMeds.api.Security;

import static com.alokMeds.api.PageConstants.ApiLoginPage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SecurityController {
	@GetMapping("/apiLoginPage")
	public String apiLogin() {
		return ApiLoginPage;
	}
	
	@GetMapping("/login")//          /login?error=true
	public String normalLogin(@RequestParam("error") boolean error) {
		return "login";
	}
}
