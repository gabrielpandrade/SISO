package com.gabrielpdev.siso.models.exceptions;

import org.springframework.dao.DataIntegrityViolationException;

public class DataBindingViolationException extends DataIntegrityViolationException{
    
    public DataBindingViolationException(String message) {
        super(message);
    }
}
