require(['bootstrap',

    'addon/about-addon',
    'addon/editor-addon',
    'addon/settings-addon/settings-addon',
    'addon/storage-addon',

    'addon/bubble-theme-addon',

    // 'modules/monitor',
    // 'modules/data',
    // 'modules/queries',
    // 'modules/charts',
    // 'modules/dev',
    // 'plugins/layout',
    // 'plugins/info',
    // 'plugins/open',
    // 'plugins/settings',
    // 'plugins/editor',
    // 'plugins/save',
    // 'plugins/preview',
    // 'plugins/facts',
    // 'plugins/stats',
    // 'addon/sample',
//    '../test/acceptance/setup'
], function(bootstrap) {
    bootstrap.init(Array.prototype.splice.call(arguments, 1));
});