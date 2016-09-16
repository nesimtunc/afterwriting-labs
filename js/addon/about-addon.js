define(function(require) {

    var Protoplast = require('protoplast'),
        About = require('module/about/view/about');

    var AboutAddon = Protoplast.extend({
        
        name: 'about',

        theme: {
            inject: 'theme'
        },

        aboutView: null,

        $create: function() {
            this.aboutView = About.create();
            this.aboutView.on('downloadClicked', function() {
                console.log('download clicked, tracking stats...');
            })
        },
        
        init: {
            injectInit: true,
            value: function() {
                var section = this.theme.getOrCreateSection('info');
                section.shortTitle = 'info';
                section.title = 'About';
                section.smallIcon = 'gfx/icons/info.svg';
                section.mainContent = this.aboutView;
            }
        }
        
    });

    return AboutAddon;
});