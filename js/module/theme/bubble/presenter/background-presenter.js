define(function(require) {

    var Protoplast = require('protoplast');

    var BackgroundPresenter = Protoplast.extend([Protoplast.Dispatcher], {
        
        themeController: {
            inject: 'theme-controller'
        },
        
        init: {
            injectInit: true,
            value: function() {
                this.view.on('clicked', this.clearSelectedSection.bind(this));
            }
        },
        
        clearSelectedSection: function() {
            this.themeController.clearSelectedSection();
        }
        
    });

    return BackgroundPresenter;
});