define(function(require) {

    var $ = require('jquery'),
        Protoplast = require('protoplast'),
        TopMenu = require('module/theme/bubble/view/menu/top-menu'),
        ContentPresenter = require('module/theme/bubble/presenter/content-presenter'),
        Sections = require('module/theme/bubble/view/sections');

    var Content = Protoplast.Component.extend({
        
        $meta: {
            presenter: ContentPresenter
        },
        
        html: '<div class="content">' +
        '<div data-comp="topMenu"></div>' +
        '<div data-comp="sections"></div>' +
        '</div>',
        
        topMenu: {
            component: TopMenu
        },
        
        sections: {
            component: Sections
        },

        $create: function() {
            this.$root = $(this.root);
        },

        visible: {
            set: function(value) {
                this._visible = value;
                this.root.style.display = value ? 'block' : 'none'
            },
            get: function() {
                return this._visible;
            }
        },

        height: {
            set: function(value) {
                this._height = value;
                this.$root.height(value)
            },
            get: function() {
                return this._height;
            }
        },

        left: {
            set: function(value) {
                this._left = value;
                this.$root.offset({left: value});
            },
            get: function() {
                return this._left;
            }
        },
        
        outerWidth: {
            get: function() {
                return this.$root.outerWidth()
            }
        },

        hide: function(duration) {
            this.$root.animate({
                top: -1000,
                duration: duration
            });
        },
        
        show: function(duration) {
            this.visible = true;
            this.$root.animate({
                top: 0,
                duration: duration
            });
        }
        
    });

    return Content;
});