define(function(require) {

    var Protoplast = require('protoplast'),
        EditorModule = require('module/editor/editor-module');

    var EditorAddon = Protoplast.Object.extend({

        name: 'editor',

        theme: {
            inject: 'theme'
        },

        section: null,

        module: null,

        $create: function() {
            this.module = EditorModule.create();
            this.editor = this.module.getEditorView();
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

            Protoplast.utils.bind(section, 'isFullyVisible', this.updateEditor.bind(this));
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