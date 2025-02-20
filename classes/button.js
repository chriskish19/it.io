
import { basic_error } from "./errors.js"; // Make sure the path is correct
import { error_codes } from "./errors.js";

export class button{
    // private members
    #button_element;
    #is_pressed;
    #set_event_listeners;

    constructor(id){
        // get the button element object
        this.button_element = document.getElementById(id);
        
        if(this.button_element == null){
            const error = new basic_error(error_codes.ELEMENT_ID_IS_NULL);
            error.output_error_info();
        }
        

        // members
        this.#is_pressed = false;
        this.#set_event_listeners = [];
    }

    // private member function
    // simple structure for keeping track of call back functions and the action
    // used to add event listeners
    #create_call_backs(call_back_function,action){
        class call_backs{
            constructor(call_back_function,action){
                this.callback = call_back_function;
                this.action = action;
            }

            equal(other){
                return (this.callback == other.callback) &&
                (this.action == other.action);
            }
        }

        return new call_backs(call_back_function,action);
    }

    // slow search but how many event listeners will really be set per button obj
    // if it was a huge number id use a hash map
    #search_call_backs(call_back_obj_to_find){
        for(let callback in this.#set_event_listeners){
            if(callback.equal(call_back_obj_to_find)){
                return true;
            }
        }
        return false;
    }


    add_button_callback(call_back_function, action){
        if (this.#button_element == null) {
            const error = new basic_error(error_codes.ELEMENT_ID_IS_NULL);
            error.output_error_info();
            return error;
        }
    
        try {
            // Bind `this` to the Button instance when calling the callback
            this.#button_element.addEventListener(action, (event) => {
                // Bind the context of `this` for the callback function
                call_back_function.call(this, event);
            });

            this.#set_event_listeners.push(this.#create_call_backs(call_back_function,action));
        } catch (caught_error) {
            const error = new basic_error(caught_error.message);
            error.output_error_info();
            return error;
        }

        return new basic_error(error_codes.SUCCESS);
    }

    remove_button_callback(call_back_obj){
        if(this.#search_call_backs(call_back_obj) == true){
            this.#button_element.removeEventListener(call_back_obj.action,call_back_obj.callback);
        }
    }

    press(){
        this.#is_pressed = true;
    }

    release(){
        this.#is_pressed = false;
    }

    change_title(new_title){
        this.#button_element.title = new_title;
    }

    remove_all_event_listeners() {
        const newElement = this.#button_element.cloneNode(true); // Clone without event listeners
        this.#button_element.replaceWith(newElement); // Replace the old element
    }
    
}
