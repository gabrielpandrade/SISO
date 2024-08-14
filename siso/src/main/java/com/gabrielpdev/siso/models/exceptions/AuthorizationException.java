package com.gabrielpdev.siso.services.exceptions;

import org.springframework.security.access.AccessDeniedException;

public class AuthorizationException extends AccessDeniedException{
    
    public AuthorizationException(String message) {
        super(message);
    }
}
