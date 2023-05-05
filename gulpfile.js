const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css( done ) {
    // compilar sass
    // pasos: 1 - identificar archivo, 2 - Compilarla, 3 - Guardar el .css
    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css') )
    
    done();
}

function imagenes( done ) {
    src('src/img/**/*')
        .pipe(dest('build/img'));
    done();
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes);
}
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series( imagenes, css, dev )

// series - Se inicia una tarea y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo