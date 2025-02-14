package io.energyhub.demoapi.eha.model.constant.annotation;

import io.energyhub.demoapi.eha.model.constant.validator.UniqueNotNullElementsCollectionValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueNotNullElementsCollectionValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueNotNullElementsCollection {

    String message() default "The input collection must not contain duplicate or null elements";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
