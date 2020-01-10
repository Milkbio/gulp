import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import del from 'del';
import imagemin from 'gulp-imagemin';

const paths = {
	styles: {
		src: 'src/styles/**/*.less',
		dest: 'assets/styles/'
	},
	scripts: {
		src: 'src/scripts/**/*.js',
		dest: 'assets/scripts/'
	},
	images: {
		src: 'src/images/**/*.{jpg,jpeg,png}',
		dest: 'assets/images/'
	}
};

export const clean = () => del([ 'assets' ]);

export function styles() {
	return gulp.src(paths.styles.src)
			.pipe(less())
			.pipe(cleanCSS())
			// pass in options to the stream
			.pipe(rename({
				basename: 'main',
				suffix: '.min'
			}))
			.pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
	return gulp.src(paths.scripts.src, { sourcemaps: true })
			.pipe(babel())
			.pipe(uglify())
			.pipe(concat('main.min.js'))
			.pipe(gulp.dest(paths.scripts.dest));
}

export function images() {
	return gulp.src(paths.images.src)
			.pipe(imagemin({optimizationLevel: 5}))
			.pipe(gulp.dest(paths.images.dest));
}

function watchFiles() {
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.images.src, images);
}
export { watchFiles as watch };

const build = gulp.series(clean, gulp.parallel(styles, scripts, images));

export default build;