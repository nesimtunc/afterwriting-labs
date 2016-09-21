define(function(require) {

    var Protoplast = require('protoplast');

    var EditorPresenter = Protoplast.Object.extend({
        
        editorModel: {
            inject: 'editor-model'
        },
        
        editorController: {
            inject: 'editor-controller'
        },
        
        init: function() {
            Protoplast.utils.bindProperty(this, 'editorModel.content', this.view, 'content');
            this.view.on('contentChanged', this.updateContent.bind(this));
        },
        
        updateContent: function(value) {
            this.editorController.updateContent(value);
        }
        
    });

    return EditorPresenter;
});