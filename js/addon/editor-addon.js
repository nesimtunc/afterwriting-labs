define(function(require) {

    var Protoplast = require('protoplast'),
        FountainEditor = require('module/editor/component/fountain-editor');

    var EditorAddon = Protoplast.Object.extend({

        name: 'editor',

        theme: {
            inject: 'theme'
        },

        scriptModel: {
            inject: 'script-model'
        },

        storage: {
            inject: 'storage'
        },
        
        settingsModel: {
            inject: 'settings-model'
        },

        section: null,

        module: null,

        $create: function() {
            this.editor = FountainEditor.create();
            this.editor.setSize('100%', '100%');
        },

        init: function() {

            var section = this.theme.getOrCreateSection('editor');
            section.shortTitle = 'write';
            section.title = 'Editor';
            section.description = 'Just a basic fountain editor. Use Ctrl-Space for auto-complete. Go to <a href="http://fountain.io" target="_blank">fountain.io</a>for more details about Fountain format.<br/> Use auto-save to automatically save your changes to the cloud every 3 seconds.<br/>Use auto-reload to reload the script from the cloud/disk to see PDF, facts & stats changes.';
            section.smallIcon = 'gfx/icons/editor.svg';
            section.fitToBottom = true;
            section.mainContent = this.editor;

            this.section = section;

            Protoplast.utils.bind(section, 'isFullyVisible', this.updateEditor);
            Protoplast.utils.bind(this.settingsModel, 'settingsLoaded', this.loadLastContent);
            this.editor.on('contentChanged', this.updateContent);
        },
        
        loadLastContent: function() {
            if (!this.settingsModel.settingsLoaded) {
                return;
            }

            if (this.settingsModel.settings.getValues().load_last_opened) {
                this.storage.load('last-content', function(content) {
                    this.scriptModel.script = content || '';
                    Protoplast.utils.bindProperty(this.scriptModel, 'script', this.editor, 'content');
                }.bind(this));
            }
            else {
                Protoplast.utils.bindProperty(this.scriptModel, 'script', this.editor, 'content');
            }
        },

        updateContent: function(content) {
            this.scriptModel.script = content;
            this.storage.save('last-content', content);
        },

        updateEditor: function() {
            if (this.section.isFullyVisible) {
                this.editor.refresh();
                this.editor.focus();
            }
        }

    });

    return EditorAddon;
});