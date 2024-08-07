package com.gabrielpdev.siso.services.exceptions;

import jakarta.persistence.EntityNotFoundException;

public class ObjectNotFoundException extends EntityNotFoundException{
    
    public ObjectNotFoundException(String message) {
        super(message);
    }
}
