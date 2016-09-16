define(function(require) {

    var Addon = require('core/addon');

    var mainView = require('protoplast').Component.extend({html: '<h1>Sample</h1>'}).create();

    var Sample = Addon.extend({

        init: function() {
            this.api.addSection({
                content: mainView,
                name: 'sample',
                title: 'Sample',
                description: 'Description...'
            })
        }

    });

    return Sample;
});
