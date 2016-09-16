define(function(require) {

    var Protoplast = require('protoplast'),
        ThemeModel = require('module/theme/bubble/model/theme-model'),
        ThemeController = require('module/theme/bubble/controller/theme-controller');

    var BubbleTheme = Protoplast.extend([Protoplast.Dispatcher], {

        context: null,

        settingsModel: null,

        $create: function() {
            this.context = Protoplast.Context.create();

            this.themeModel = ThemeModel.create();
            this.themeController = ThemeController.create();
            
            this.context.register('theme-model', this.themeModel);
            this.context.register('theme-controller', this.themeController);

            this.context.build();
        },

        use: function(view) {
            this.context.register(view);
        },
        
        getOrCreateSection: function(name) {
            return this.themeController.getOrCreateSection(name);
        },

        setFooter: function(content) {
            this.themeModel.footer = content;
        },

        start: function() {
            this.context._objects.pub('bubble-theme/init')
        }
        
    });

    return BubbleTheme;
});