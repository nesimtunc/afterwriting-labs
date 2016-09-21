define(function(require) {

    var Protoplast = require('protoplast'),
        EditorPresenter = require('module/editor/presenter/editor-presenter'),
        cm = require('libs/codemirror/lib/codemirror');

        require('libs/codemirror/addon/selection/active-line');
        require('libs/codemirror/addon/hint/show-hint');
        require('libs/codemirror/addon/hint/anyword-hint');
        require('module/editor/utils/cmmode');

    var Editor = Protoplast.Component.extend({
        
        $meta: {
            presenter: EditorPresenter
        },

        html: '<textarea></textarea>',
        
        editor: null,

        width: null,

        height: null,

        content: '',

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