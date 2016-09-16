define(function(require) {

    var Protoplast = require('protoplast');

    var TopMenuPresenter = Protoplast.Model.extend({
        
        sections: null,

        themeModel: {
            inject: 'theme-model'
        },

        small: {
            get: function() {
                return this.themeModel.small
            }
        },

        init: {
            injectInit: true,
            value: function() {
                Protoplast.utils.bind(this, 'themeModel.sections', this.updateSections.bind(this));
                Protoplast.utils.bind(this, 'themeModel.sections.selected', this.updateSelectedSection.bind(this));
            }
        },

        updateSections: function() {
            if (this.themeModel.sections.length) {
                this.view.sections = this.themeModel.sections;
            }
        },
        
        updateSelectedSection: function() {
            this.view.setSelected(this.themeModel.sections.selected);
        },

        $create: function() {
            this.sections = Protoplast.Collection.create();
        }

    });

    return TopMenuPresenter;
});