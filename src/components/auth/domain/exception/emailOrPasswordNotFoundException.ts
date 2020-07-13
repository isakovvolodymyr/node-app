
export class EmailOrPasswordNotFoundException extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, EmailOrPasswordNotFoundException.prototype);
    }
}