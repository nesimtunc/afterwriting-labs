define(function(require) {

    var Protoplast = require('protoplast');

    var SectionsPresenter = Protoplast.extend([Protoplast.Dispatcher], {

        themeModel: {
            inject: 'theme-model'
        },

        init: {
            injectInit: true,
            value: function() {
                Protoplast.utils.bind(this, 'themeModel.sections.selected', this.showSelectedSection.bind(this));
                Protoplast.utils.bindProperty(this, 'themeModel.sections', this.view, 'sections');
            }
        },
        
        showSelectedSection: function() {
            this.view.hideAll(function(){
                this.view.showSection(this.themeModel.sections.selected);
            }.bind(this));
        }
        
    });

    return SectionsPresenter;
});