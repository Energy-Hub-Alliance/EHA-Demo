package io.energyhub.demoapi.eha.model.constant.validator;


import io.energyhub.demoapi.eha.model.constant.annotation.UniqueNotNullElementsCollection;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class UniqueNotNullElementsCollectionValidator implements ConstraintValidator<UniqueNotNullElementsCollection, Collection<?>> {

    @Override
    public boolean isValid(Collection c, ConstraintValidatorContext ctx) {

        if (c == null || c.isEmpty()) {
            return true;
        }

        ctx.disableDefaultConstraintViolation();
        if (c.contains(null)) {
            ConstraintValidatorContext.ConstraintViolationBuilder builder = ctx.buildConstraintViolationWithTemplate("Field represented as collection, must not contain null");
            builder.addConstraintViolation();
            return false;
        }

        Set<Object> uniqueSetOfElements = new HashSet<>();

        for (Object element : c) {
            if (uniqueSetOfElements.contains(element)) {
                ctx.buildConstraintViolationWithTemplate("Field represented as collection, must contain unique elements").addConstraintViolation();
                return false;
            }
            uniqueSetOfElements.add(element);
        }
        return true;
    }
}