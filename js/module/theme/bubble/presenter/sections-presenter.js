define(function(require) {

    var Protoplast = require('protoplast');

    var SectionsPresenter = Protoplast.extend([Protoplast.Dispatcher], {

        $meta: {
            constructors: [Protoplast.constructors.autobind]
        },

        themeModel: {
            inject: 'theme-model'
        },
        
        themeController: {
            inject: 'theme-controller'
        },

        init: {
            injectInit: true,
            value: function() {
                Protoplast.utils.bind(this, 'themeModel.sections.selected', this.showSelectedSection.bind(this));
                Protoplast.utils.bindProperty(this, 'themeModel.sections', this.view, 'sections');
            }
        },
        
        showSelectedSection: function() {
            this.view.hideAll(this._onAllHidden);
        },

        _onAllHidden: function() {
            this.themeController.allSectionsHidden();
            this.view.showSection(this.themeModel.sections.selected, this._onSelectedShown);
        },

        _onSelectedShown: function() {
            this.themeController.selectedSectionFullyVisible();
        }
        
    });

    return SectionsPresenter;
});