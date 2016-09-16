define(function(require) {

    var Presenter = require('core/presenter'),
        Input = require('component/control/input'),
        Checkbox = require('component/control/checkbox'),
        Dropdown = require('component/control/dropdown'),
        Protoplast = require('protoplast');

    var SettingsPanelPresenter = Presenter.extend({

        settings: {
            inject: 'settings-model'
        },
        
        controller: {
            inject: 'settings-controller'
        },
        
        init: function() {
            Protoplast.utils.bindProperty(this, 'settings.groups', this.view, 'config');

            // bind valus
            
            this.view.on('configValueChanged', function(event) {
                this.controller.updateValue(event.key, event.value);
            }.bind(this));
        },
        
        __deprectated__oldInit: function() {

            this.view.config = this.getSettingsPanelConfig();

            this.view.on('configValueChanged', function(event) {
                this.updateSettings(event.key, event.value);
            }.bind(this));
        },

        getSettingsPanelConfig: function() {
            var settingsConfig = Protoplast.Collection.create([]);

            var printSection = {title: 'Print', controls: []};
            printSection.controls.push(this.createDropdown('print_profile', 'Page size', [{label: 'A4', value: 'a4'}, {label: 'US letter', value: 'usletter'}]));
            printSection.controls.push(this.createCheckbox('print_title_page', 'Print title page'));
            printSection.controls.push(this.createCheckbox('print_sections', 'Print sections'));
            printSection.controls.push(this.createCheckbox('print_synopsis', 'Print synopsis'));
            printSection.controls.push(this.createCheckbox('print_notes', 'Print notes'));
            printSection.controls.push(this.createCheckbox('print_headers', 'Print headers'));
            printSection.controls.push(this.createCheckbox('print_actions', 'Print actions'));
            printSection.controls.push(this.createCheckbox('print_dialogues', 'Print dialogue'));
            printSection.controls.push(this.createInput('print_header', 'Header'));
            printSection.controls.push(this.createInput('print_footer', 'Footer'));
            printSection.controls.push(this.createInput('print_watermark', 'Watermark'));
            settingsConfig.add(printSection);

            var layoutSection = {title: 'Layout', controls: []};
            layoutSection.controls.push(this.createCheckbox('split_dialogue', 'Split dialogue between pages'));
            layoutSection.controls.push(this.createCheckbox('use_dual_dialogue', 'Accept dual dialogue'));
            layoutSection.controls.push(this.createCheckbox('double_space_between_scenes', 'Double space between scenes'));
            layoutSection.controls.push(this.createCheckbox('each_scene_on_new_page', 'Page break after a scene'));
            layoutSection.controls.push(this.createCheckbox('number_sections', 'Prefix sections with numbers'));
            layoutSection.controls.push(this.createCheckbox('embolden_scene_headers', 'Embolden scene headers'));
            layoutSection.controls.push(this.createDropdown('scenes_numbers', 'Scene numbers', [
                {label: 'none', value: 'none'},
                {label: 'left', value: 'left'},
                {label: 'right', value: 'right'},
                {label: 'both', value: 'both'}
            ]));
            layoutSection.controls.push(this.createCheckbox('scene_continuation_bottom', 'Scene continuation (the bottom of a page)'));
            layoutSection.controls.push(this.createCheckbox('scene_continuation_top', 'Scene continuation(the top of the next page)'));
            settingsConfig.add(layoutSection);

            var textSection = {title: 'Text', controls: []};
            textSection.controls.push(this.createInput('text_more', 'Override (MORE) text to'));
            textSection.controls.push(this.createInput('text_contd', "Override (CONT'D) text to"));
            textSection.controls.push(this.createInput('text_scene_continued', 'Override CONTINUED (scene continuation) text to'));
            settingsConfig.add(textSection);

            var miscellaneousSection = {title: 'Miscellaneous', controls: []};
            miscellaneousSection.controls.push(this.createCheckbox('show_background_image','Show background image'));
            miscellaneousSection.controls.push(this.createCheckbox('load_last_opened','Load last opened on startup'));
            miscellaneousSection.controls.push(this.createCheckbox('night_mode','Night mode'));
            settingsConfig.add(miscellaneousSection);
            
            var statsSection = {title: 'Statistics', controls: []};
            statsSection.controls.push(this.createCheckbox('stats_keep_last_scene_time', 'Keep last scene slugline time of day if not specified'));
            statsSection.controls.push(this.createInput('stats_who_with_who_max', '"Who with who" max characters'));
            settingsConfig.add(statsSection);
            
            var experimentalSection = {title: 'Experimental', controls: []};
            experimentalSection.controls.push(this.createCheckbox('cloud_lazy_loading', 'GoogleDrive/Dropbox lazy loading'));
            experimentalSection.controls.push(this.createCheckbox('pdfjs_viewer', 'JavaScript PDF viewer'));
            settingsConfig.add(experimentalSection);

            return settingsConfig;
        },

        getCurrentConfig: function() {
            return this.settings.get_config();
        },

        createDropdown: function(key, label, options) {
            return {
                key: key,
                initialValue: this.getCurrentConfig()[key],
                label: label,
                options: options,
                type: Dropdown
            }
        },

        createCheckbox: function(key, label) {
            return {
                key: key,
                initialValue: this.getCurrentConfig()[key],
                label: label,
                type: Checkbox
            }
        },

        createInput: function(key, label) {
            return {
                key: key,
                initialValue: this.getCurrentConfig()[key],
                label: label,
                type: Input
            }
        },


        updateSettings: function(key, value) {
            this.getCurrentConfig()[key] = value;
            this.settings.save();
        }

    });

    return SettingsPanelPresenter;
});