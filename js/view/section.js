define(function(require){

    var Protoplast = require('protoplast');

    var Section = Protoplast.Component.extend({

        html: '<div class="plugin-content"><h1 data-prop="$title"></h1><div data-comp="contentWrapper"></div></div>',

        /**
         * Component
         */
        content: null,

        contentWrapper: {
            component: Protoplast.Component.extend({})
        },

        init: function() {
            Protoplast.utils.bind(this, 'content', this.addContent.bind(this));
        },

        addContent: function() {
            this.contentWrapper.add(this.content);
        }

    });

    return Section;

});