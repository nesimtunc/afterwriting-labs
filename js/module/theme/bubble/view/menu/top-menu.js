define(function(require) {

    var Protoplast = require('protoplast'),
        TopMenuPresenter = require('module/theme/bubble/presenter/menu/top-menu-presenter'),
        TopMenuItem = require('module/theme/bubble/view/menu/top-menu-item');

    var TopMenu = Protoplast.Component.extend({

        $meta: {
            presenter: TopMenuPresenter
        },

        html: '<div class="top-bar"></div>',

        sections: null,

        $create: function() {
            this.sections = Protoplast.Collection.create();
        },

        init: function() {
            Protoplast.utils.renderList(this, 'sections', {
                rendererDataProperty: 'section',
                renderer: TopMenuItem
            })
        },

        setSelected: function(section) {
            this.children.forEach(function(topMenuItem) {
                topMenuItem.selected = topMenuItem.section === section;
            })
        }

    });

    return TopMenu;
});