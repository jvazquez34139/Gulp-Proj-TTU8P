# Gulp-Proj-TTU8P
Automating development tasks with gulp!

## Still Using Gulp 3.9.0

## Gulp Tasks:
### concatScripts

Sources the js files in the js directory putting them in a single file named _all.js_.

Also making a _all.js.map_.

### minifyJS

First runs concatScripts task.

Sources the all.js file in the js directory and uglifies it.

Using ```concat()``` to make the _all.min.js_ file.

### scripts -main task

First runs minifyJS task.

Sources _all.js.map_ and _all.min.js_ and places them in the _dist/js_ directory.

### compileSass

Sources global.css in the sass directory compiling the scss files to css.

Using ```concat()``` to make the _all.css_ file in the css directory.

Also making a _all.css.map_ with it.

### minifyCSS

First runs compileSass task.

Sources _all.css_ to pipe in `cleanCss()` to minify it into _all.min.css_ putting it in the css directory.

### styles -main task

First runs minifyCSS

Sources all.css.map and all.min.css to put in the _dist/styles_ directory.

### images -main task

Sources all images in the _images_ directory and compresses them placing them in the _dist/content_ directory.

### clean -main task

Deletes _dist_ and _css_ directories as well as _all*.js*_ files from the js directory.

### build -main task

First runs clean task.

Starts scripts, styles, images tasks.

Then copies _index.html_ to the _dist_ directory.

### watchCSS

Watches _sass/**/*.scss_ for changes then runs styles task on change.

### default -main task

First runs build and watchCSS tasks

Then starts server on port 3000

Reloads page when styles task runs through the watchCSS task.
