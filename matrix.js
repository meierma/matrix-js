class Matrix {

    constructor(selector, options) {
        var defaults = {
            test: 1
        }

        this.extend(defaults, options);
        this.init(selector);
    }

    extend(target, source) {
        // Loop through our object
        for (var prop in source) {
            if (target.hasOwnProperty(prop)) {
                // Push each value from `obj` into `extended`
                target[prop] = source[prop];
            }
        }
        return target;
    }

    init(selector) {
        console.log(selector);
        
        var elements = document.querySelectorAll(selector);
        console.log(elements);
        [].forEach.call(elements, element => {
           this.createCanvas(element); 
        });
    }

    createCanvas(element){
        console.log(element);
        
        var newCanvas = document.createElement("canvas");
        element.appendChild(newCanvas);

        newCanvas.style.height = element.offsetHeight+"px";
        newCanvas.style.width = element.offsetWidth+"px";
        element.style.overflow = "hidden";

    }

}