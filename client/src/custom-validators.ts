import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function integerOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value !== null && value % 1 !== 0) {
            return { integerOnly: true };
        }
        return null;
    };
}

export function decimalValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const valid = /^(\d+\.\d+|\d+)$/.test(control.value);
        return valid ? null : { decimalOnly: { value: control.value } };
    };
}
