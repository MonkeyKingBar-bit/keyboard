const Keyboard = {
    elements: {
        main: null, // main keyboard element
        keysWrapper: null,
        keys: [] // array of the buttons for the keys
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        capsLock: false
    },
    
    init() { 
        // Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // Setup main elements
        this.elements.main.classList.add ('keyboard', '1keyboard-hidden');
        this.elements.keysContainer.classList.add('keyboard_keys');

        // Add DOM
        this.elements.main.appendChild(this.elements.keysContainer); // add this.elements.keysContainer to the end of the this.elements.main
        document.body.appendChild(this.elements.main);

    }, //run when page the first loads up, initialize

    _createKeys() {
        const fragment = document.createDocumentFragment(); // container for different elements
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ]; // array of entire key layer (number, letters, backspace and etc.)

        // Create HTML for an icon
        const createIconHtml = (icon,name) => {
            return `<i class="material-icons">${icon_name}</i>`
        }

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attribute/classes 
            keyElement.getAttribute("type", "button");
            keyElement.classList.add("keyboard_key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add('keyboard_key-wide');
                    keyElement.innerHTML = createIconHtml("backspace");
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1); //remove the last character from the current value
                        this._triggerEvent("oninput");
                    })
                    break;
                
            }
        })
    }, // private method

    _triggerEvent(handlerName) {
        console.log("Event Triggered! Event name" + handlerName)
    }, // private method, triggering one of these two events (oninput, onclose)

    _toggleCapsLock() {
        console.log("Caps Lock Toggled!")
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    }
};

window.addEventListener('DOMContentLoaded', function() {
    Keyboard.init();
})