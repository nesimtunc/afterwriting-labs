define(function(require) {

    var Protoplast = require('protoplast'),
        SectionsPresenter = require('module/theme/bubble/presenter/sections-presenter');
        SectionContainer = require('module/theme/bubble/view/section-container');

    var Sections = Protoplast.Component.extend({

        html: '<div class="plugin-contents"></div>',

        $meta: {
            presenter: SectionsPresenter
        },
        
        sections: null,
        
        $create: function() {
            this.sections = Protoplast.Collection.create();
        },
        
        init: function() {
            Protoplast.utils.renderList(this, 'sections', {
                renderer: SectionContainer,
                rendererDataProperty: 'section',
                create: function(parent, data, renderer, propertyName) {
                    var child = renderer.create();
                    child[propertyName] = data;
                    child.visible = child.section === parent.sections.selected;
                    parent.add(child);
                }
            })
        },

        hideAll: function(callback) {
            var counter = this.children.length;

            var allDone = function() {
                counter--;
                if (!counter) {
                    callback();
                }
            };

            this.children.forEach(function(sectionContainer) {
                sectionContainer.fadeOut(allDone);
            });
        },

        showSection: function(section) {
            this.children.forEach(function(sectionContainer) {
                if (sectionContainer.section === section) {
                    sectionContainer.fadeIn();
                }
            });
        }
        
    });

    return Sections;
});