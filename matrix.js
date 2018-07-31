class Matrix {

    constructor(selector, options) {

        var config = {
            letters: "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑",
            font_size: 5,
            font_color: "#0F0",
            bg_color: "#000",
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
            var canvas_background = this.createCanvas(element);
            var canvas_text = this.createCanvas(element);

            // Adjust size of canvas
            element.style.position = "relative";
            canvas_text.style.position = canvas_background.style.position  = "absolute";
            canvas_text.style.top = canvas_background.style.top  = 0;
            canvas_text.style.left = canvas_background.style.left  = 0;
            canvas_text.style.height = canvas_background.style.height = element.offsetHeight + "px";
            canvas_text.style.width = canvas_background.style.width = element.offsetWidth + "px";


            var context_text = canvas_text.getContext("2d");
            var context_background = canvas_background.getContext("2d");

            //converting the string into an array of single characters
            var letters = config.letters.split("");

            var font_size = config.font_size;
            var columns = canvas_text.width / font_size; //number of columns for the rain
            // //an array of drops - one per column
            var drops = [];
            //x below is the x coordinate
            //1 = y co-ordinate of the drop(same for every drop initially)
            for (var x = 0; x < columns; x++)
                drops[x] = 1;


            context_background.fillStyle = config.bg_color;
            context_background.fillRect(0, 0, canvas_background.width, canvas_background.height);

            this.draw_objects = [];
            this.draw_objects.push(
                {
                    context: context_text,
                    canvas: canvas_text,
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

            draw_data.context.fillStyle = "rgba(0,0,0,0.05)"; //green text
            draw_data.context.fillRect(0,0,draw_data.canvas.width,draw_data.canvas.height);
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
