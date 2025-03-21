
export class DatabaseError extends Error{
    constructor(message){
        super(message);
        this.name = 'DatabaseError';
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';    
    }
}