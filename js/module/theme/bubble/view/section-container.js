define(function(require) {

    var $ = require('jquery'),
        Protoplast = require('protoplast');

    var SectionContainer = Protoplast.Component.extend({

        html: '<div>' +
        '<h1><span data-prop="title"></span>&nbsp;<span data-prop="infoIcon" class="info-icon"/></h1>' +
        '<p data-prop="description" class="info-content" style="display: none"></p>' +
        '<div data-comp="contentParent"></div>' +
        '</div>',

        contentParent: {
            component: Protoplast.Component.extend()
        },

        title: null,

        description: null,

        infoIcon: null,

        section: null,

        descriptionVisible: false,

        visible: {
            set: function(value) {
                this._visible = value;
                this.root.style.display = value ? 'block' : 'none'
            },
            get: function() {
                return this._visible;
            }
        },

        $create: function() {
            this.$root = $(this.root);
            this.$description = $(this.description);

            this.infoIcon.onclick = function() {
                this.descriptionVisible = !this.descriptionVisible;
            }.bind(this)
        },
        
        fadeIn: function() {
            this.$root.fadeIn(500);
        },
        
        fadeOut: function(callback) {
            this.$root.fadeOut(500, callback);
        },
        
        init: function() {
            Protoplast.utils.bind(this, 'section.mainContent', this.recreateContent.bind(this));
            Protoplast.utils.bind(this, 'section.title', this.updateTitle.bind(this));
            Protoplast.utils.bind(this, 'section.description', this.updateDescription.bind(this));
            Protoplast.utils.bind(this, 'descriptionVisible', this.toggleDescription.bind(this));
        },

        toggleDescription: function() {
            if (this.descriptionVisible) {
                this.$description.show({
                    duration: 200,
                    easing: 'linear'
                });
            }
            else {
                this.$description.hide({
                    duration: 200,
                    easing: 'linear'
                });
            }
        },

        recreateContent: function() {
            if (this.section.mainContent) {
                this.contentParent.add(this.section.mainContent);
            }
        },

        updateTitle: function() {
            this.title.innerHTML = this.section.title;
        },

        updateDescription: function() {

            if (!this.section.description) {
                this.description.style.display = 'none';
                this.infoIcon.style.display = 'none';
            }
            else {
                this.description.style.display = this.descriptionVisible ? 'block' : 'none';
                this.infoIcon.style.display = 'inline';
            }

            this.description.innerHTML = this.section.description;
        }

    });

    return SectionContainer;
});