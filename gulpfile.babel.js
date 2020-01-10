import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import runSequence from 'run-sequence';
import rev from 'gulp-rev';
import revCollector from 'gulp-rev-collector';
import server from 'gulp-server-livereload'
import del from 'del';

const paths = {
	styles: {
		src: 'src/styles/**/*.less',
		dest: 'dist/src/css/'
	},
	scripts: {
		src: 'src/scripts/**/*.js',
		dest: 'dist/src/js/'
	},
	images: {
		src: 'src/images/**/*.{jpg,jpeg,png}',
		dest: 'dist/src/img/'
	},
	html: {
		src: 'src/index.html',
		dest: 'dist/'
	}
};

export const clean = () => del([ 'dist' ]);

export function styles() {
	return gulp.src(paths.styles.src)
			.pipe(less())
			.pipe(cleanCSS())
			// pass in options to the stream
			.pipe(rename({
				basename: 'main',
				suffix: '.min'
			}))
			.pipe(rev()) // 添加hash后缀
			.pipe(gulp.dest(paths.styles.dest))
			.pipe(rev.manifest()) // 生成文件映射
			.pipe(gulp.dest(paths.styles.dest)); // 将映射文件导出
}

export function scripts() {
	return gulp.src(paths.scripts.src, { sourcemaps: true })
			.pipe(babel())
			.pipe(uglify())
			.pipe(concat('main.min.js'))
			.pipe(rev())
			.pipe(gulp.dest(paths.scripts.dest))
			.pipe(rev.manifest())
			.pipe(gulp.dest(paths.scripts.dest));
}

export function images() {
	return gulp.src(paths.images.src, {since: gulp.lastRun(images)})
			.pipe(imagemin({optimizationLevel: 5}))
			.pipe(rev())
			.pipe(gulp.dest(paths.images.dest));
}

export function revHtml() {
	return gulp.src([paths.styles.dest + '*.json', paths.scripts.dest + '*.json', paths.html.src])
			.pipe(revCollector({
				replaceReved: true // 允许替换, 已经被替换过的文件
			}))  //替换html中对应的记录
			.pipe(gulp.dest(paths.html.dest));
}

function watchFiles() {
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.images.src, images);
}
export { watchFiles as watch };

export function webServer() {
	return gulp.src('src')
			.pipe(server({
				defaultFile: 'index.html',
				livereload: true,
				open: true
			}));
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, images), revHtml);
export default build;