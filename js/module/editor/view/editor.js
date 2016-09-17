define(function(require) {

    var Protoplast = require('protoplast'),
        cm = require('libs/codemirror/lib/codemirror');

        require('libs/codemirror/addon/selection/active-line');
        require('libs/codemirror/addon/hint/show-hint');
        require('libs/codemirror/addon/hint/anyword-hint');
        require('module/editor/utils/cmmode');

    var Editor = Protoplast.Component.extend({

        html: '<textarea></textarea>',
        
        editor: null,

        width: null,

        height: null,
        
        init: function() {
            this.createEditor();
            if (this.width !== null && this.height !== null) {
                this.setSize(this.width, this.height);
            }
        },
        
        createEditor: function() {
            this.editor = cm.fromTextArea(this.root, {
                mode: "fountain",
                lineNumbers: false,
                lineWrapping: true,
                styleActiveLine: true,
                extraKeys: {
                    "Ctrl-Space": "autocomplete"
                }
            });

            this.editor.refresh();
            
            this.editor.on('change', this.dispatch.bind(this, 'contentChanged'));
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