const {src, dest, series, watch} = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const fileinclude = require('gulp-file-include')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const sass = require('gulp-sass')(require('sass'))
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
    return del(['build/*'])
}

const resources = () => {
    return src('dev/resources/**')
    .pipe(dest('build'))
}

const styles = () => {
    return src('dev/styles/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", notify.onError()))
      .pipe(concat('main.css'))
      .pipe(autoprefixer({
       cascade: false
       }))
      .pipe(cleanCss({
          level: 2
      }))
      .pipe(sourcemaps.write())
      .pipe(dest('build'))
      .pipe(browserSync.stream());
}

const svgSprites = () => {
    return src('dev/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('build/img'))
}

const scripts = () => {
    return src([
      'dev/js/components/**/*.js',
      'dev/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

const htmlInclude = () => {
    return src(['dev/*.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
      server: {
        baseDir: 'build'
      }
    })
}

const imagesDev = () => {
  return src([
    'dev/img/**/*.jpg',
    'dev/img/**/*.png',
    'dev/img/*.svg',
    'dev/img/**/*.jpeg'
  ])
  .pipe(dest('build/img'))
}

const imagesBuild = () => {
    return src([
      'dev/img/**/*.jpg',
      'dev/img/**/*.png',
      'dev/img/*.svg',
      'dev/img/**/*.jpeg'
    ])
    .pipe(image())
    .pipe(dest('build/img'))
}

watch('dev/styles/**/*.scss', styles)
watch('dev/js/**/*.js', scripts)
watch('dev/part/*.html', htmlInclude)
watch('dev/*.html', htmlInclude)
watch('dev/resources/**', resources)
watch('dev/img/svg/**/*.svg', svgSprites)
watch('dev/img/**/*.jpg', imagesDev)
watch('dev/img/**/*.png', imagesDev)
watch('dev/img/**/*.jpeg', imagesDev)

const htmlMinify = () => {
  return src('build/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true
    }))
    .pipe(dest('build'))
}


exports.default = series(clean, htmlInclude, scripts, styles, resources, imagesDev, svgSprites, watchFiles)

exports.build = series(clean, htmlInclude, scripts, styles, resources, imagesBuild, svgSprites, htmlMinify)
