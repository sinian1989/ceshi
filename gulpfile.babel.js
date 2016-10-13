import path from 'path'
import gulp from 'gulp'
import gutil from 'gulp-util'
import WebpackDevServer from "webpack-dev-server"
import webpack from "webpack"
import del from 'del'
import env from 'gulp-env'
import gulpSequence from 'gulp-sequence'
import nodemon from 'gulp-nodemon'
import open from 'open'
import livereload from 'gulp-livereload'
var minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

const DEV_PORT = 5100,PROD_PORT = 8400;
gulp.task('serve', cb =>{
  let webpackConfig = require('./webpack.config')
  let myConfig = Object.create(webpackConfig)
  myConfig.entry.unshift('webpack-dev-server/client?http://localhost:' + DEV_PORT)
  new WebpackDevServer(webpack(myConfig), {
      noInfo: false,
      hot: true,
      inline: true,
      historyApiFallback: true,
      publicPath: myConfig.output.publicPath,
      stats: {
        colors: true
      }
  }).listen(DEV_PORT, "localhost", err => {
      if(err) throw new gutil.PluginError("webpack-dev-server", err)
      gutil.log("[webpack-dev-server]", "==> 🌎  http://localhost:" + DEV_PORT)
      open('http://localhost:' + DEV_PORT)
  });
})

gulp.task('clean', cb => del([path.join(__dirname, '/dist/*')]))
gulp.task('laji', function(cb) {
    del(['./*.map','./*-compiled.js','./dist/*.map','./dist/*-compiled.js','./src/*.map','./src/*-compiled.js','./src/libs/*.map','./src/libs/*-compiled.js','./src/vuex/*.map','./src/vuex/*-compiled.js','./src/vuex/modules/*.map','./src/vuex/modules/*-compiled.js']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});

gulp.task('set-env-prod', ()=>{
  env({
    vars: {
      'NODE_ENV':'production'
    }
  })
}),
gulp.task('set-env-dev', ()=>{
  env({
    vars: {
      'NODE_ENV':'development'
    }
  })
})

gulp.task('webpack', cb => {
  let webpackConfig = require('./webpack.config')
  let myConfig = Object.create(webpackConfig)
  webpack(myConfig, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err)
      gutil.log("[webpack]", stats.toString({
          // output options
      }))
      cb()
  })
})

gulp.task('webpack:dist',gulpSequence('set-env-prod','webpack'))

gulp.task('build', gulpSequence('clean','webpack:dist'))
// 使用 nodemone 跑起服务器
gulp.task('nodemon', ()=> {
  nodemon({
    script: path.join(__dirname,'/server.js'), 
    ext: 'js',
    watch: [
      path.join(__dirname,'/dist')
    ],
    env: { 'NODE_ENV': 'production','PORT':PROD_PORT }
  })
})

gulp.task('serve:dist',gulpSequence('build','nodemon'))



gulp.task('serve:new',gulpSequence('build','nodemon','livereload'))//还不好使
var lujing=['src/vuex/*.js','src/vuex/modules/*.js'];
// 当客户端被监听的文件改变时，刷新浏览器
gulp.task('livereload', function() {
    livereload.listen();
    var server = livereload();
    return gulp.watch(lujing, function(event) {
        server.changed(event.path);
    });
});

gulp.task('style',function() {
    gulp.src('./dist/style.css')
        .pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});
gulp.task('script',function(){
    gulp.src('./dist/*common.js')
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('rjs', function() {
    return	gulp.src('dist/*main.js')
        .pipe(concat('index.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('wanshi',gulpSequence('webpack','rjs','script'))