define(function(require) {

    var Protoplast = require('protoplast');

    var ThemeModel = Protoplast.Model.extend({
        
        sections: null,

        _allSections: null,

        sectionsMap: null,
        
        initAnimationDelay: 800,
        
        width: null,
        
        height: null,
        
        footer: '',

        expanded: false,
        
        small: {
            computed: ['width'],
            value: function() {
                return this.width < 800; 
            }
        },
        
        $create: function() {
            this._allSections = Protoplast.Collection.create();
            this.sections = Protoplast.CollectionView.create(this._allSections);
            this.sectionsMap = {};
        },
        
        addSection: function(name, section) {
            this.sectionsMap[name] = section;
            this._allSections.add(section);
        },
        
        getSection: function(name) {
            return this.sectionsMap[name];
        }
        
    });

    return ThemeModel;
});