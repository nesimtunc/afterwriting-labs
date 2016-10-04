define(function(require) {

    var Protoplast = require('protoplast'),
        BubbleTheme = require('module/theme/bubble/bubble-theme'),
        Main = require('module/theme/bubble/view/main');

    var BubbleThemeAddon = Protoplast.extend({

        name: 'theme',

        main: null,

        root: null,
        
        appModel: {
            inject: 'app-model'
        },

        $create: function() {

            this.theme = BubbleTheme.create();
            this.main = Main.create();

            document.body.innerHTML = '';
            this.theme.use(this.main);
            this.root = Protoplast.Component.Root(document.body);
            this.root.add(this.main);
        },
        
        init: {
            injectInit: true,
            value: function() {
                var footerText = 'version: ' + this.appModel.version + ' (' + this.appModel.lastUpdated + ')';
                this.theme.setFooter(footerText)
            }
        },

        start: {
            sub: 'app/init',
            value: function() {
                this.theme.start();
            }
        },

        getOrCreateSection: function(name) {
            return this.theme.getOrCreateSection(name)
        }
    });

    return BubbleThemeAddon;
});