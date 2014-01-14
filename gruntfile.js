module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		
		concat: {
  		  browserControls: {
        src: ['client/src/browserControls/**/*.js'],
        dest: 'temp/browserControlsTemp.js',
        options: {
          separator:',\n\n\n'
        }
      }
		},
		replace: {
			client: {
				options: {
  				patterns: [{ 
  					match: /\/\/ @include Board.js/g,
  					replacement: '<%= grunt.file.read("./client/src/Board.js") %>' 
  				},
  				{
    				match: /\/\/ @include BrowserControl.js/g,
  					replacement: '<%= grunt.file.read("./client/src/BrowserControl.js") %>'
  				},
  				{
    				match: /\/\/ @include deviceTypes.js/g,
  					replacement: '<%= grunt.file.read("./client/src/deviceTypes.js") %>'
  				},
  				{
    				match: /\/\/ @include deviceMethods.js/g,
  					replacement: '<%= grunt.file.read("./client/src/deviceMethods.js") %>'
  				},
  				{
    				match: /\/\/ @include inputTypes.js/g,
  					replacement: '<%= grunt.file.read("./client/src/inputTypes.js") %>'
  				},
  				{
    				match: /\/\/ @include underscoreFunctions.js/g,
  					replacement: '<%= grunt.file.read("./client/src/underscoreFunctions.js") %>'
  				},
  				{
    				match: /\/\/ @include warning.txt/g,
  					replacement: '<%= grunt.file.read("./client/src/warning.txt") %>'
  				},
  				{
    				match: /\/\/ @include easing.js/g,
  					replacement: '<%= grunt.file.read("./client/src/easing.js") %>'
  				}
  		  ],
  		  force: true
  		},
        files: [
          {expand: true, flatten: true, src: ['./client/src/nodebotui-client.js'], dest: './client'}
        ]
			},
			browserControls: {
				options: {
  				patterns: [
  				  {
    				  match: /\/\/ @include folder BrowserControls/g,
              replacement: '<%= grunt.file.read("./temp/browserControlsTemp.js") %>'
            }
  				],
  				force: true
        },
        files: [
          {expand: true, flatten: true, src: ['./client/nodebotui-client.js'], dest: './client'}
        ]
			}
		},
		jshint: {
		  client: ['client/src/*.js']
		},
		uglify: {
		  client: {
        files: [
          { src: ['client/nodebotui-client.js'], dest: 'client/nodebotui-client.min.js', filter: 'isFile' }
        ]
      }
		},
		cleanup: {
		}
		
	});

	//grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('removeTempDirectory', 'Remove temp directory', function() {
    grunt.file.delete('temp');
  });
  
	grunt.registerTask('default', ['jshint', 'concat', 'replace:client', 'replace:browserControls', 'uglify', 'removeTempDirectory']);
	
	
};

	