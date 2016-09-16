define(function(require) {

    var Protoplast = require('protoplast'),
        MainPresenter = require('module/theme/bubble/presenter/main-presenter'),
        Logo = require('module/theme/bubble/view/logo'),
        Background = require('module/theme/bubble/view/background'),
        Footer = require('module/theme/bubble/view/footer'),
        Content = require('module/theme/bubble/view/content'),
        BubbleMenu = require('module/theme/bubble/view/menu/bubble-menu');

    var Main = Protoplast.Component.extend({

        $meta: {
            presenter: MainPresenter
        },

        html: '<div>' +
            '<div data-comp="logo"></div>' +
            '<div data-comp="background"></div>' +
            '<div class="menu"><div data-comp="mainMenu"></div></div>' +
            '<div data-comp="footer"></div>' +
            '<div data-comp="content"></div>' +
            '</div>',

        logo: {
            component: Logo
        },

        background: {
            component: Background
        },

        mainMenu: {
            component: BubbleMenu
        },

        footer: {
            component: Footer
        },

        content: {
            component: Content
        }
    });

    return Main;
});