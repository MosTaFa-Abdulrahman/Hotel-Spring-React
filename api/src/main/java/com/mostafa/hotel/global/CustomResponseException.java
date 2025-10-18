package com.mostafa.hotel.global;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class CustomResponseException extends RuntimeException {
    private String message;
    private int code;

    public static CustomResponseException ResourceNotFound(String message) {
        return new CustomResponseException(message, 404);
    }

    public static CustomResponseException BadCredentials() {
        return new CustomResponseException("Bad Credentials", 401);
    }

    public static CustomResponseException BadRequest(String message) {
        return new CustomResponseException(message, 400);
    }


}