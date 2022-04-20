package com.marketganada;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan //서블릿컴포넌트(필터, 서블릿, 리스너)를 스캔해서 빈으로 등록한다.
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MarketganadaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MarketganadaApplication.class, args);
	}

}
