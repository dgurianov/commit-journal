package com.gud.comjou.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/error")
@Slf4j
public class GlobalErrorController implements ErrorController {

    public String getErrorPath() {
        return "/error";
    }

    @RequestMapping
    public ResponseEntity<String> handleError(HttpServletRequest request) {
        log.warn("There was an error while doing request '{}' to path  '{}' ",request.getMethod(),request.getContextPath());
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body("{'Error' : 'You have been redirected to /error'}");
    }
}
