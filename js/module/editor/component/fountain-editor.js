define(function(require) {

    var Editor = require('module/editor/component/editor');

    require('libs/codemirror/addon/selection/active-line');
    require('libs/codemirror/addon/hint/show-hint');
    require('libs/codemirror/addon/hint/anyword-hint');
    require('module/editor/utils/cmmode');

    var EditorView = Editor.extend({

        $create: function() {
            this.editorOptions = {
                mode: "fountain",
                lineNumbers: false,
                lineWrapping: true,
                styleActiveLine: true,
                extraKeys: {
                    "Ctrl-Space": "autocomplete"
                }
            }
        }
    });

    return EditorView;
});