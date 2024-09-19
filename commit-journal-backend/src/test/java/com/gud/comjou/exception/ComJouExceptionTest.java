package com.gud.comjou.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ComJouExceptionTest {

    @Test
    void testComJouExceptionMessage() {
        String errorMessage = "This is a test error message";
        ComJouException exception = assertThrows(ComJouException.class, () -> {
            throw new ComJouException(errorMessage);
        });

        assertEquals(errorMessage, exception.getMessage());
    }
}