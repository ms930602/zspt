'use strict'

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	var serveStatic = require('serve-static');

	var config = {
		app: 'src',
		dist: 'dist'
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: config,
		//压缩文件
		// uglify: {
		// 	//生成的压缩文件带注释
		// 	options: {
		// 		stripBanners: true,
		// 		//生成map文件 可以吧压缩js还原 便与调试
		// 		sourceMap: true,
		// 		banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		// 	},
		// 	//压缩文件
		// 	build: {
		// 		src: '<%= config.app %>/{,*/}*.js',
		// 		dest: 'dest/mxsoft1.min.js'
		// 	}
		// },
		//检查代码
		jshint: {
			build: [
				'Gruntfile.js',
				'<%= config.app %>/scripts/{,*/}*.js',
				'<%= config.app %>/scripts/vendor/*',
				],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		//监控
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= config.app %>/scripts/{,*/}*.js'],
				// tasks: ['jshint'],
				options: {
					//为真 默认取值 35729 也可自己定义 通知这个端口reload
					livereload: true
				}
			},
			jstest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['test:watch']
			},
			styles: {
				files: ['<%= config.app %>/styles/**/*.css'],
				tasks: [
				//newer 只对更新的文件进行copy
				'copy:styles',
				// 'autoprefixer'
				]
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.app %>/**/*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= config.app %>/images/{,*/}*'
				]
			}
		},
		//合并
		// concat: {
		// 	options: {
		// 		separator: ';'
		// 	},
		// 	dist: {
		// 		src: ['src/*.js'],
		// 		dest: 'dest/mxsoft.min.js'
		// 	}
		// },
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.app %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'images/{,*/}*.webp',
						'{,*/}*.html',
						'styles/fonts/{,*/}*.*'
					]
				}]
			},
			styles: {
				//动态处理
				expand: true,
				//是否匹配以点号开头的系统文件
				dot: false,
				// 修改后缀名
				// ext: '.min.css',
				// 从第几个“.”开始修改
				// ectDot: 'first' / 'last'
				cwd: '<%= config.app %>/styles',
				dest:'.tmp/styles/',
				src: '{,*/}*.css'
			}
		},
		clean: {
			dist: {
				files:[{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: {
				src: '.tmp'
			}
		},
		wiredep: {
			app: {
				//过滤前面的../
				ignorePath: /^\/|\.\.\//,
				src: ['<%= config.app %>/index.html']
			},
			sass: {
				src: ['<%= config.app %>/style/{,*/}*.{scss,sass}']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/images'
				}]
			}
		},
		useminPrepare: {
			options: {
				dest: '<%= config.dist %>'
			},
			html: '<%= config.app %>/index.html'
		},
		usemin: {
			options: {
				assetsDirs: [
					'<%= config.dist %>',
					'<%= config.dist %>/images',
					'<%= config.dist %>/styles'
				]
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/styles/{,*/}*.css']
		},
		//同时运行编译task
		concurrent: {
			server: [
				// 'sass:server',
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist:[
				'copy:styles',
				'imagemin:dist',
				'svgmin:dist'
			]
		},
		//MD5命名
		rev: {
			dist: {
				files: {
					src: [
						'<%= config.dist %>/scripts/{,*/}*.js',
						'<%= config.dist %>/styles/{,*/}*.css',
						'<%= config.dist %>/images/{,*/}*.*',
						'<%= config.dist %>/styles/fonts/{,*/}*.*',
						'!<%= config.dist %>/*.{ico,png}'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					//readonly = "readonly" 变成 直接 readonly
					collapseBooleanAttributes: true,
					//清除标签之间的空格 不清除script,pre,textarea style的空格
					collapseWhitespace: true,
					//标签至少保留一个空格
					conservativeCollapse: true,
					//删除没有必要的引号 value="fullname" ->value=fullname
					removeAttributeQuotes: true,
					//去掉html中注释掉的内容
					removeComments: true,
					//删掉为空的属性 如 title=""
					removeEmptyAttributes: true,
					//删除不会影响浏览器的标签
					removeOptionalTags: true,
					//删除样式中没有必要的声明  <input type="text"/> -> <input/>
					removeRedundantAttributes: false,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: '{,*/}*.html',
					dest: '<%= config.dist %>'
				}]
			}
		},
		//自动添加兼容信息
		// autoprefixer:{
  //           options:{
  //               //任务设置
  //               browserslist:['> 1%','last 2 versions','chrome']
  //           },
  //           dist: {
  //               files:[{
  //               	expand: true,
  //               	cwd: '.tmp/styles/',
  //               	src: '{,*/}*.css',
  //               	dest:'.tmp/styles/'
  //               }]
  //           },
  //       },
        //开启服务
        connect: {
        	options: {
        		port: 9000,
        		open: false,
        		livereload: 35729,
        		hostname: 'localhost'
        	},
        	livereload: {
        		options: {
        			middleware: function(connect){
        				return [
			              serveStatic('.tmp'),
			              connect().use('/bower_components', serveStatic('./bower_components')),
			              serveStatic(config.app)
			            ];
        			}
        		}
        	},
        	test: {
        		options: {
        			open: false,
        			port: 9001,
        			middleware:function(connect){
        				return [
			              serveStatic('.tmp'),
			              serveStatic('.test'),
			              connect().use('/bower_components', serveStatic('./bower_components')),
			              serveStatic(config.app)
			            ];
        			}
        		}
        	},
        	dist: {
		        options: {
		          open: true,
		          base: '<%= config.dist %>',
		          livereload: false
		        }
		    }
        }
	});

	//服务配置
	grunt.registerTask("serve","start Test mxsoft zsxt",function(target){
		if(grunt.option('allow-remote')){
			grunt.config.set('connect.options.hostname','0.0.0.0');
		}
		if(target === 'dist'){
			return grunt.task.run(['build','connect:dist:keepalive'])
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			// 'autoprefixer',
			'connect:livereload',
			'watch'
			]);
	});

	grunt.registerTask('test',function(target){
		if(target !== 'watch'){
			grunt.task.run([
				'clean:server',
				'concurrent:test',
				// 'autoprefixer'
				]);
		}

		grunt.task.run([
				'connect:test',
				'mocha'
			]);
	});

	grunt.registerTask('build',[
		'clean:dist',
		'wiredep',
		'useminPrepare',
		'concurrent:dist',
		// 'autoprefixer',
		'concat:generated',
		'cssmin',
		'uglify:generated',
		'copy:dist',
		'rev',
		'usemin',
		'htmlmin'
		]);

	grunt.registerTask('default',[
		// 'newer:jshint',
		'test',
		'build']);
};