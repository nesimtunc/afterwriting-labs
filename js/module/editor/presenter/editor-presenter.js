define(function(require) {

    var Protoplast = require('protoplast');

    var EditorPresenter = Protoplast.extend([Protoplast.Dispatcher], {
        
        editorModel: {
            inject: 'editor-model'
        },
        
        editorController: {
            inject: 'editor-controller'
        },
        
        init: {
            injectInit: true,
            value: function() {
                Protoplast.utils.bindProperty(this, 'editorModel.content', this.view, 'content');
                this.view.on('contentChanged', this.updateContent.bind(this));
            }
        },
        
        updateContent: function(value) {
            this.editorController.updateContent(value);
        }
        
    });

    return EditorPresenter;
});