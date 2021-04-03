package com.hryu.projecttrackerapp.projecttrackerapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class ProjecttrackerappApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjecttrackerappApplication.class, args);
	}

}
