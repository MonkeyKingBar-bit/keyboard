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
        this.elements.main.classList.add ('keyboard', 'keyboard-hidden');
        this.elements.keysContainer.classList.add('keyboard_keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard_key");

        // Add DOM
        this.elements.main.appendChild(this.elements.keysContainer); // add this.elements.keysContainer to the end of the this.elements.main
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                    element.focus();
                })
            })
        });
    }, //run when page the first loads up, initialize

    _createKeys() {
        const fragment = document.createDocumentFragment(); // container for different elements
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "done", "voice","space", "EN", "arrow_left", "arrow_right"
        ]; // array of entire key layer (number, letters, backspace and etc.)

        // Create HTML for an icon
        const createIconHtml = (icon_name) => {
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
                    keyElement.classList.add("keyboard_key-wide");
                    keyElement.innerHTML = createIconHtml("backspace");
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1); //remove the last character from the current value
                        this._triggerEvent("oninput");
                    })
                    break;

                case "caps":
                    keyElement.classList.add("keyboard_key-wide", "keyboard_key-activatable");
                    keyElement.innerHTML = createIconHtml("keyboard_capslock");
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard_key-active', this.properties.capsLock)
                    })
                    break;

                case "enter":
                    keyElement.classList.add("keyboard_key-wide");
                    keyElement.innerHTML = createIconHtml("keyboard_return");
                    keyElement.addEventListener('click', () => {
                        this.properties.value += "\n"; // go to the next string
                        this._triggerEvent("oninput");
                    })
                    break;

                case "voice":
                    keyElement.classList.add("keyboard_key");
                    keyElement.innerHTML = createIconHtml("keyboard_voice");
                    keyElement.addEventListener('click', () => {
                        this.properties.value += "\n"; // go to the next string
                        this._triggerEvent("oninput");
                    })
                    break;

                case "space":
                    keyElement.classList.add("keyboard_key-extra_wide");
                    keyElement.innerHTML = createIconHtml("space_bar");
                    keyElement.addEventListener('click', () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    })
                    break;

                case "en":
                    keyElement.classList.add("keyboard_key");
                    keyElement.innerHTML.textContent = 'EN';
                    keyElement.addEventListener('click', () => {
                        this._toggleLang();
                        this._triggerEvent("oninput");
                    })
                    break;

                case "shift":
                    keyElement.classList.add("keyboard_key-wide", "keyboard_key-activatable");
                    keyElement.innerHTML = createIconHtml("expand_less");;
                    keyElement.addEventListener('click', () => {
                        this._toggleShift();
                    keyElement.classList.toggle('keyboard_key-active', this.properties.shift)
                    })
                    break;

                case "done":
                    keyElement.classList.add("keyboard_key-wide", "keyboard_key-dark");
                    keyElement.innerHTML = createIconHtml("check_circle");
                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent("onclose");
                    })
                    break;

                case "arrow_left":
                    keyElement.classList.add("keyboard_key-wide");
                    keyElement.innerHTML = createIconHtml("chevron_left");
                    keyElement.addEventListener('click', () => {
                        this._toggleArrow();
                        this._triggerEvent("oninput");
                    })
                    break;

                case "arrow_right":
                    keyElement.classList.add("keyboard_key-wide");
                    keyElement.innerHTML = createIconHtml("chevron_right");
                    keyElement.addEventListener('click', () => {
                        this._toggleArrow();
                        this._triggerEvent("oninput");
                    })
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    })
                    break;
            }

            fragment.appendChild(keyElement); // add keyElement to the add fragment

            if(insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

        })

        return fragment;
    }, // private method

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] === 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    }, // private method, triggering one of these two events (oninput, onclose)

    _toggleCapsLock() {
       this.properties.capsLock = !(this.properties.capsLock);

       for (const key of this.elements.keys) {
           if (key.childElementCount === 0) { // key.children.length
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
           }
       }
    },

    _toggleShift() {
       this.properties.shift = !(this.properties.shift);

       for (const key of this.elements.keys) {
           if (key.childElementCount === 0) { // key.children.length
                key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                if (this.properties.shift && this.properties.capsLock) {
                    key.textContent = key.textContent.toLowerCase();
                };
           }
       }
    },

    _toggleLang() {

    },

    _toggleArrow() {

    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard-hidden');
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard-hidden');
    }
};

window.addEventListener('DOMContentLoaded', function() {
    Keyboard.init();
})