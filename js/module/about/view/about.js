define(function(require) {

    var $ = require('jquery'),
        Protoplast = require('protoplast'),
        AboutTemplate = require('text!module/about/view/about.html');

    var About = Protoplast.Component.extend({

        $create: function() {
            this.root.innerHTML = AboutTemplate;

            $(this.root).find('#download-link').click(this.dispatch.bind(this, 'downloadClicked'));
        }

    });

    return About;
});