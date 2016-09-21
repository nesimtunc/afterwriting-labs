define(function(require) {

    var Protoplast = require('protoplast');

    /**
     * Represens a section/page on the site
     */
    var Section = Protoplast.Model.extend({
        
        bigIcon: null,
        
        smallIcon: null,

        /**
         * If true, will be active only if the script is loaded
         */
        needsScript: false,

        /**
         * Main content plugin
         */
        mainContent: null,
        
        name: null,
        
        title: null,
        
        shortTitle: null,
        
        description: null,

        fitToBottom: false,
        
        isActive: false,
        
        isFullyVisible: false,
        
        $create: function(name) {
            this.name = name;
        }
        
    });

    return Section;
});