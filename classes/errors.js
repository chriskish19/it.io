// errors.js
export const error_codes = {
    SUCCESS: 0,
    ELEMENT_ID_IS_NULL: "Failed to get element ID",
    EVENT_LISTENER_FAIL: "Failed to add an event listener",
    ELEMENT_IS_NULL : "Element is a null object"
}


export class basic_error{
    constructor(error_code){
        this.error = error_code;
        this.timestamp = new Date().toLocaleString(); // Get current time
    }

    output_error_info(){
        console.error(`[${this.timestamp}] ❌ Error: ${this.error}`);
    }

    
}

