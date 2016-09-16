define(function(require) {

    var Protoplast = require('protoplast');

    var ContentPresenter = Protoplast.extend([Protoplast.Dispatcher], {

        themeModel: {
            inject: 'theme-model'
        },
        
        init: {
            injectInit: true,
            value: function() {
                this.view.visible = false;
                this.view.hide();

                Protoplast.utils.bind(this, 'themeModel.sections.selected', this.updateContentVisibility.bind(this));
                Protoplast.utils.bind(this, 'themeModel.sections.selected', this.updateContentSize.bind(this));
                Protoplast.utils.bind(this, 'themeModel.height', this.updateContentSize.bind(this));
                Protoplast.utils.bind(this, 'themeModel.width', this.updateContentSize.bind(this));
            }
        },

        updateContentVisibility: function() {
            if (this.themeModel.sections.selected) {
                this.view.show(500);
            }
            else {
                this.view.hide(500);
            }
        },

        updateContentSize: function() {
            var left = this.themeModel.small ? 0 : (this.themeModel.width - this.view.outerWidth) / 2;
            var height = this.themeModel.height;
  
            this.view.height = height;
            this.view.left = left;
        }

    });

    return ContentPresenter;
});