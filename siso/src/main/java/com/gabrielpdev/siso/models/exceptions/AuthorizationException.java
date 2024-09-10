package com.gabrielpdev.siso.models.exceptions;

import org.springframework.security.access.AccessDeniedException;

public class AuthorizationException extends AccessDeniedException {

    public AuthorizationException(String message) {
        super(message);
    }

}
