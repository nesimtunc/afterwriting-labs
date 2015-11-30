require(['bootstrap',
		'modules/monitor',
		'modules/data',
		'modules/queries',
		'modules/charts',
		'plugins/info',
		'plugins/open',
		'plugins/settings',
		'plugins/editor',
		'plugins/save',
		'plugins/preview',
		'plugins/facts',
		'plugins/stats'
], function (Bootstrap) {
	Bootstrap.create().init(arguments);
});