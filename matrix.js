class Matrix {

    constructor(selector, options) {

        var config = {
            letters: "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑",
            font_size: 20,
            font_color: "#0F0",
            bg_color: "#000",
            interval: 50,
            blend_alpha: 0.05,
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

    hexToRGB(hex, alpha) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
        var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
        var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
        if (alpha) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        }
        else {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    }

    init(selector, config) {
        var elements = document.querySelectorAll(selector);

        [].forEach.call(elements, element => {
            var canvas = this.createCanvas(element);

            // Adjust size of canvas
            element.style.position = "relative";
            canvas.style.position = "absolute";
            canvas.style.top = 0;
            canvas.style.left = 0;
            canvas.style.height = element.offsetHeight + "px";
            canvas.style.width = element.offsetWidth + "px";
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

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

            context.fillStyle = this.hexToRGB(config.bg_color);
            context.fillRect(0, 0, canvas.width, canvas.height);

            var falling_lines = [];

            this.draw_objects = [];
            this.draw_objects.push(
                {
                    context: context,
                    canvas: canvas,
                    drops: drops,
                    letters: letters,
                    font_size: font_size,
                    font_color: config.font_color,
                    falling_lines: falling_lines,
                    blend_alpha: config.blend_alpha,
                    bg_color: config.bg_color,
                }
            )
        });

        setInterval(this.draw.bind(this), config.interval);
    }

    createCanvas(element) {
        var new_canvas = document.createElement("canvas");
        element.appendChild(new_canvas);

        return new_canvas;
    }

    //drawing the characters
    draw() {
        [].forEach.call(this.draw_objects, draw_data => {

            draw_data.context.fillStyle = this.hexToRGB(draw_data.bg_color, draw_data.blend_alpha); //green text
            draw_data.context.fillRect(0, 0, draw_data.canvas.width, draw_data.canvas.height);

            draw_data.context.fillStyle = draw_data.font_color; //green text
            draw_data.context.font = draw_data.font_size + "px arial";

            draw_data.falling_lines.push(Math.floor(Math.random() * draw_data.drops.length))
            draw_data.falling_lines.push(Math.floor(Math.random() * draw_data.drops.length))

            for (var i = 0; i < draw_data.falling_lines.length; i++) {
                var position_y = draw_data.falling_lines[i];
                //a random character
                var text = draw_data.letters[Math.floor(Math.random() * draw_data.letters.length)];
                //x = i*font_size, y = value of drops[i]*font_size
                draw_data.context.fillText(text, position_y * draw_data.font_size, draw_data.drops[position_y] * draw_data.font_size);

                //sending the drop back to the top randomly after it has crossed the screen
                //adding a randomness to the reset to make the drops scattered on the Y axis
                if (draw_data.drops[position_y] * draw_data.font_size > draw_data.canvas.height) {
                    draw_data.drops[position_y] = 0;
                    delete draw_data.falling_lines[i];
                }

                //incrementing Y coordinate
                draw_data.drops[position_y]++;
            }
        })
    }
}
