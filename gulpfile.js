// GULP 4 + SASS Latest Setup (Safe Version)

import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import { deleteAsync } from 'del';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';

const sass = gulpSass(dartSass);

// Paths
const paths = {
  src: {
    base: 'src',
    html: 'src/*.html',
    partials: 'src/partials/**/*.html',
    scss: 'src/assets/scss/**/*.scss',
    css: 'src/assets/css/**/*.css',
    js: 'src/assets/js/**/*.js',
    images: 'src/assets/images/**/*',
    fonts: 'src/assets/fonts/**/*',
    static: [
      'src/assets/**/*',
      '!src/assets/scss/**',
      '!src/assets/css/**',
      '!src/assets/js/**'
    ]
  },
  dist: {
    base: 'dist',
    assets: 'dist/assets',
    css: 'dist/assets/css',
    js: 'dist/assets/js',
    images: 'dist/assets/images',
    fonts: 'dist/assets/fonts'
  }
};

// Clean dist folder
export const clean = () => {
  return deleteAsync(['dist']);
};

// HTML task
export const htmlTask = () => {
  return gulp.src(paths.src.html)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist.base))
    .pipe(browserSync.stream());
};

// SCSS Compile and Minify task
export const sassTask = () => {
  return gulp.src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
};

// CSS assets copy
export const cssAssetsTask = () => {
  return gulp.src(paths.src.css)
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
};

// JavaScript minify task
export const jsTask = () => {
  return gulp.src(paths.src.js)
    .pipe(terser())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
};

// Image optimize task
export const imageTask = () => {
  return gulp.src(paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));
};

// Font copy task
export const fontTask = () => {
  return gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts));
};

// SAFE static asset copy task (no overwrite of src)
export const copyAssets = () => {
  return gulp.src(paths.src.static)
    .pipe(gulp.dest(paths.dist.assets));
};

// Watch files
export const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: paths.dist.base
    }
  });
  gulp.watch(paths.src.html, htmlTask);
  gulp.watch(paths.src.partials, htmlTask);
  gulp.watch(paths.src.scss, sassTask);
  gulp.watch(paths.src.css, cssAssetsTask);
  gulp.watch(paths.src.js, jsTask);
  gulp.watch(paths.src.images, imageTask);
  gulp.watch(paths.src.fonts, fontTask);
};

// Build
export const build = gulp.series(
  clean,
  gulp.parallel(htmlTask, sassTask, cssAssetsTask, jsTask, imageTask, fontTask, copyAssets)
);

// Default
export default gulp.series(build, watchFiles);
