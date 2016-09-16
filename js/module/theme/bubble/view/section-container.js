define(function(require) {

    var $ = require('jquery'),
        Protoplast = require('protoplast');

    var SectionContainer = Protoplast.Component.extend({

        section: null,

        visible: {
            set: function(value) {
                this._visible = value;
                this.root.style.display = value ? 'block' : 'none'
            },
            get: function() {
                return this._visible;
            }
        },

        $create: function() {
            this.$root = $(this.root);
        },
        
        fadeIn: function() {
            this.$root.fadeIn(500);
        },
        
        fadeOut: function(callback) {
            this.$root.fadeOut(500, callback);
        },
        
        init: function() {
            Protoplast.utils.bind(this, 'section.mainContent', this.recreateContent.bind(this));
        },

        recreateContent: function() {
            if (this.section.mainContent) {
                this.add(this.section.mainContent);
            }
        }

    });

    return SectionContainer;
});