# matrix-js
Matrix-js is a vanilla js library for creating a matrix effect in chosen html elements

Have any suggestions or feedback? Reach out [@MarcelMeier92](https://twitter.com/marcelmeier92)


[Demo Website](https://marcelmeier.me/matrix-js/)

## Getting Started
Just download the `matrix.min.js` file and link it at the end of your body in your web project.
```html
<div class="matrix"></div>

<script src="matrix.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function (event) {
        var matrix = new Matrix('.matrix');
    });
</script>
```

You are able to pass additional settings:
```html
<script>
    document.addEventListener("DOMContentLoaded", function (event) {
        var matrix = new Matrix('.matrix',{
            letters: "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑",
            font_size: 20,
            font_color: "#0F0",
            bg_color: "#000",
            interval: 50,
            blend_alpha: 0.05,
        });
    });
</script>
```

