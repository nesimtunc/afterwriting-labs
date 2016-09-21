define(function(require) {

    var Protoplast = require('protoplast');

    var EditorController = Protoplast.extend({

        editorModel: {
            inject: 'editor-model'
        },

        updateContent: function(content) {
            this.editorModel.content = content;
        }

    });

    return EditorController;
});