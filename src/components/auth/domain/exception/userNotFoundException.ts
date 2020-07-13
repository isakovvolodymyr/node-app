
export class UserNotFoundException extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UserNotFoundException.prototype);
    }
}