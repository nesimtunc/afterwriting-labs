define(function(require) {

    var p = require('protoplast');

    /**
     * Performs assertions, all chai/sinon assertions go here
     */
    var Assert = p.extend({

        $create: function(dom, dropbox) {
            this.dom = dom;
            this.dropbox = dropbox;
        },

        active_plugin_is: function(name) {
            chai.assert.strictEqual(name, this.dom.get_active_plugin(), 'Expected ' + name + ' plugin to be active, but ' + this.dom.get_active_plugin() + ' is active');
        },

        file_list_is_visible: function() {
            chai.assert.ok(this.dom.jstree_visible(), 'file list is not visible');
        },

        editor_content: function(content) {
            chai.assert.equal(this.dom.editor_content(), content, "editor's content does not match expected value");
        },

        dropbox_saved: function(count) {
            chai.assert.equal(this.dropbox.saved_count, count, 'content has been saved ' + this.dropbox.saved_count + ', expected: ', count);
        },

        night_mode_is_enabled: function(value) {
            var night_mode = this.dom.is_night_mode();
            if (value) {
                chai.assert.ok(night_mode);
            }
            else {
                chai.assert.notOk(night_mode);
            }
        }

    });


    return Assert;

});