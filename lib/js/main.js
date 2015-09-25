/*global requirejs */
requirejs.config({
	baseUrl: './js',
	paths: {
		jQuery: "jquery/dist/jquery.min",
		PIXI: 'PIXI/pixi',
		ssm: 'simplestatemanager/dist/ssm.min'
	},
	shim: {
		jQuery: {
			exports: 'jQuery'
		},
		PIXI: {
			deps: ['jQuery'],
			exports: 'PIXI'
		},
		ssm: {
			exports: 'ssm'
		}
	}
});
