import { errors } from "errors.js"
import {error_codes} from "errors.js"

export class text{
    // id : element id
    // message : the text to generate
    // image_path : path to the cursor image
    constructor(id,message,image_path){
        this.text_element = document.getElementById(id);

        if(this.text_element == null){
            const error = new errors(error_codes.ELEMENT_ID_IS_NULL);
            error.output_error_info();
        }

        this.message = message;
        this.path = image_path;

        // Create a new element for the cursor image
        let new_div_element = document.createElement("div");

        
    }

    // speed : time delay in miliseconds
    async type(speed) {
        for (const character of this.message) {
            this.text_element.textContent += character;
            await new Promise(resolve => setTimeout(resolve, speed)); // Delay each letter
        }
    }
}