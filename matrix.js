class Matrix {

    constructor(selector, options) {

        var config = {
            //chinese characters - taken from the unicode charset
            letters: "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑",
            font_size: 5,
            font_color: "#0F0",
        }

        this.extend(config, options);

        this.init(selector, config);
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

    init(selector, config) {
        var elements = document.querySelectorAll(selector);

        [].forEach.call(elements, element => {
            var canvas = this.createCanvas(element);

            // Adjust size of canvas
            canvas.style.height = element.offsetHeight + "px";
            canvas.style.width = element.offsetWidth + "px";
            element.style.overflow = "hidden";

            var context = canvas.getContext("2d");

            //converting the string into an array of single characters
            var letters = config.letters.split("");

            var font_size = config.font_size;
            var columns = canvas.width / font_size; //number of columns for the rain
            // //an array of drops - one per column
            var drops = [];
            //x below is the x coordinate
            //1 = y co-ordinate of the drop(same for every drop initially)
            for (var x = 0; x < columns; x++)
                drops[x] = 1;

            this.draw_objects = [];
            this.draw_objects.push(
                {
                    context: context,
                    canvas: canvas,
                    drops: drops,
                    letters: letters,
                    font_size : font_size,
                    font_color : config.font_color,
                }
            )
        });
        
        setInterval(this.draw.bind(this), 33);
    }
    
    createCanvas(element) {
        var newCanvas = document.createElement("canvas");
        element.appendChild(newCanvas);
        
        return newCanvas;
    }
    
    //drawing the characters
    draw() {
        console.log(this.draw_objects);

        [].forEach.call(this.draw_objects, draw_data => {
            //Black BG for the canvas
            //translucent BG to show trail
            draw_data.context.fillStyle = "rgba(0, 0, 0, 0.02)";
            draw_data.context.fillRect(0, 0, draw_data.canvas.width, draw_data.canvas.height);

            draw_data.context.fillStyle = draw_data.font_color; //green text
            draw_data.context.font = draw_data.font_size + "px arial";
            //looping over drops
            for (var i = 0; i < draw_data.drops.length; i++) {
                //a random chinese character to print
                var text = draw_data.letters[Math.floor(Math.random() * draw_data.letters.length)];
                //x = i*font_size, y = value of drops[i]*font_size
                draw_data.context.fillText(text, i * draw_data.font_size, draw_data.drops[i] * draw_data.font_size);

                //sending the drop back to the top randomly after it has crossed the screen
                //adding a randomness to the reset to make the drops scattered on the Y axis
                if (draw_data.drops[i] * draw_data.font_size > draw_data.canvas.height && Math.random() > 0.975)
                draw_data.drops[i] = 0;

                //incrementing Y coordinate
                draw_data.drops[i]++;
            }
        })
    }
}