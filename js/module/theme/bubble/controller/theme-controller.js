define(function(require) {

    var Protoplast = require('protoplast'),
        Section = require('module/theme/bubble/model/section');

    var ThemeController = Protoplast.extend({
        
        themeModel: {
            inject: 'theme-model'
        },
        
        getOrCreateSection: function(name) {
            var section;
            
            if (section = this.themeModel.getSection(name)) {
                return section;
            }
            
            section = Section.create(name);
            this.themeModel.addSection(name, section);
            return section;
        },

        selectSection: function(section) {
            this.themeModel.sections.selected = section;
        },

        clearSelectedSection: function() {
            this.themeModel.sections.selected = null;
        },
        
        toggleExpanded: function() {
            this.themeModel.expanded = !this.themeModel.expanded;
        }
        
    });

    return ThemeController;
});