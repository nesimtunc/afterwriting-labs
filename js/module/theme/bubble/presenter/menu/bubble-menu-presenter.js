define(function(require) {

    var Protoplast = require('protoplast');

    var BubbleMenuPresenter = Protoplast.Model.extend({
        
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
                Protoplast.utils.bind(this, 'themeModel.width', this.updatePositions.bind(this, 0));
            }
        },

        updateSections: function() {
            if (this.themeModel.sections.length) {
                this.view.sections = this.themeModel.sections;
            }
        },

        initTheme: {
            sub: 'bubble-theme/init',
            value: function() {
                this.updatePositions(this.themeModel.initAnimationDelay);
            }
        },

        updatePositions: function(delay) {
            this.themeModel.sections.forEach(function(section, index) {
                var attrs = this.getExplodeAttrs(index, this.view.children.length, this.view.children.length);
                this.view.animateItem(section, attrs, delay);
            }, this);
        },

        $create: function() {
            this.sections = Protoplast.Collection.create();
        },
        
        getPosition: function(index, all, max) {

            var cols = 3;
            var imgSize = this.small ? 70 : 100;
            var padding = this.small ? 5 : 15;
            var corner = {};
            corner.top = this.small ? 120 : 150;
            var iconsWithPadding = cols * (imgSize + padding) + padding;
            corner.left = ($('html').width() - iconsWithPadding) / 2;
            
            var item_row = Math.floor(index / cols),
                rows = Math.floor(all / cols),
                itemCol = index % cols,
                lastRowItems = (all % cols) || cols,
                itemInTheLastRow = (index >= all - lastRowItems),
                itemsInCurrentRow = itemInTheLastRow ? lastRowItems : cols,
                maxRows = Math.floor(max / cols),
                emptySpaceLeftPadding = ((cols - itemsInCurrentRow) * (imgSize + padding) - padding) / 2,
                topPadding = rows < maxRows ? imgSize / 3 : 0;

            var pos = {
                top: item_row * (imgSize + padding) + corner.top + topPadding,
                left: padding + itemCol * (imgSize + padding) + corner.left + emptySpaceLeftPadding
            };

            return pos;
        },
        
        getExplodeAttrs: function(index, all, max) {
            var imgSize = this.small ? 70 : 100;

            var attrs = this.getPosition(index, all, max);
            attrs.opacity = 1.0;
            attrs.width = imgSize - 40;
            attrs.height = imgSize - 40;

            return attrs;
        }
        
    });

    return BubbleMenuPresenter;
});