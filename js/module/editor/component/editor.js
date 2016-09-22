define(function(require) {

    var Protoplast = require('protoplast'),
        cm = require('libs/codemirror/lib/codemirror');

    var Editor = Protoplast.Component.extend({

        html: '<textarea></textarea>',

        editor: null,

        width: null,

        height: null,

        content: '',

        editorOptions: null,

        $create: function() {
            this.editorOptions = {};
        },

        init: function() {
            this.createEditor();

            if (this.width !== null && this.height !== null) {
                this.setSize(this.width, this.height);
            }

            Protoplast.utils.bind(this, 'content', function(){
                this.editor.setValue(this.content);
            }.bind(this));

            this.editor.on('change', function(){
                this._content = this.editor.getValue();
                this.dispatch('contentChanged', this.content);
            }.bind(this));
        },

        createEditor: function() {
            this.editor = cm.fromTextArea(this.root, this.editorOptions);
            this.editor.refresh();
        },

        focus: function() {
            this.editor.focus();
        },

        refresh: function() {
            this.editor.refresh();
        },

        setSize: function(width, height) {
            this.width = width;
            this.height = height;
            if (this.editor) {
                this.editor.setSize(width, height);
            }
        }

    });

    return Editor;
});