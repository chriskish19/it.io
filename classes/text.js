import { basic_error } from "./errors.js"
import {error_codes} from "./errors.js"

export class text {
    constructor(id, image_path, width, height,time_out) {
        this.text_element = document.getElementById(id);

        if (!this.text_element) {
            const error = new basic_error(error_codes.ELEMENT_ID_IS_NULL);
            error.output_error_info();
            return;
        }

        this.message = this.text_element.textContent;
        this.path = image_path;
        this.text_element.textContent = "";

        // Create an <img> element for the cursor
        this.imgElement = document.createElement("img");

        if (!this.imgElement) {
            const error = new basic_error(error_codes.ELEMENT_IS_NULL);
            error.output_error_info();
            return;
        }

        // Set image attributes
        this.imgElement.src = this.path; 
        this.imgElement.alt = "Cursor Image";
        this.imgElement.style.width = width + "px";  
        this.imgElement.style.height = height + "px";
        this.imgElement.style.verticalAlign = "middle"; // Align with text baseline

        // Add a blinking animation using CSS
        this.imgElement.classList.add("blinking-cursor");

        // Append the cursor image before typing starts
        this.text_element.appendChild(this.imgElement);

        // Stop blinking after 10 seconds and make it disappear
        setTimeout(() => {
            this.imgElement.style.display = "none"; // Hide cursor completely
        }, time_out);
    }

    async type(speed) {
        for (const character of this.message) {
            // Move the cursor to the end
            this.text_element.appendChild(this.imgElement);

            // Insert character before the cursor
            this.text_element.insertBefore(document.createTextNode(character), this.imgElement);

            // Delay for typing effect
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }
}
