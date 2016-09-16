define(function(require) {

    var Protoplast = require('protoplast');

    var FooterPresenter = Protoplast.extend([Protoplast.Dispatcher], {
        
        themeModel: {
            inject: 'theme-model'
        },
        
        init: {
            injectInit: true,
            value: function() {
                Protoplast.utils.bindProperty(this, 'themeModel.footer', this.view, 'content');
            }
        }
        
    });

    return FooterPresenter;
});