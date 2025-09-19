import { Transform } from 'class-transformer';
import {

registerDecorator,
ValidationArguments,
ValidationOptions,
ValidatorConstraint,
ValidatorConstraintInterface,
IsNotEmpty,
IsString,
MinLength,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match' })
class MatchConstraint implements ValidatorConstraintInterface {
validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
}

defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must match ${relatedPropertyName}`;
}
}

export function Match(property: string, validationOptions?: ValidationOptions) {
return function (object: Object, propertyName: string) {
    registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [property],
        validator: MatchConstraint,
    });
};
}

export class AdminPasswordUpdateDto {
@IsNotEmpty()
@IsString()
@Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
adminid: string;

@IsNotEmpty()
@IsString()
@MinLength(6)
@Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
newpassword: string;

@IsNotEmpty()
@IsString()
@Match('newpassword', { message: 'confirmpassword must match newpassword' })
@Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
confirmpassword: string;
}