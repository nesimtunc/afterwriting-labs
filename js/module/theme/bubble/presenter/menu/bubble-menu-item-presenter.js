define(function(require) {

    var Protoplast = require('protoplast');

    var BubbleMenuItemPresenter = Protoplast.extend([Protoplast.Dispatcher], {

        themeController: {
            inject: 'theme-controller'
        },

        init: {
            injectInit: true,
            value: function() {
                this.view.on('clicked', this.selectSection.bind(this));
            }
        },

        selectSection: function() {
            this.themeController.selectSection(this.view.section);
        }

    });

    return BubbleMenuItemPresenter;
});