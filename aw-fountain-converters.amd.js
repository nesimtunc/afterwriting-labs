(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.awFountainConverters = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var FdxConverter = function(jQuery) {
    this.$ = jQuery;
};

FdxConverter.prototype.parse = function(paragraph, dual) {
    var $ = this.$;

    var type = $(paragraph).attr('Type');
    var align = $(paragraph).attr('Alignment');
    var page_break = $(paragraph).attr('StartsNewPage');
    var text = $(paragraph).find('> Text').map(function() {
        return $(this).text();
    }).get().join(' ');
    var notes = $(paragraph).find('ScriptNote Paragraph Text').map(function() {
        return '[[' + $(this).text() + ']]';
    }).get();

    text = $('<div/>').html(text).text();
    text = text.replace(/’/g, "'").replace(/”/g, '"').replace(/“/g, '"').replace(/‘/g, "'");

    if (page_break === 'Yes') {
        text += '\n====\n' + text;
    }

    if (type === 'Character' || type === 'Scene Heading' || type === 'Transition') {
        text = text.toUpperCase();
    }

    if (notes.length) {
        if (type === 'Scene Heading') {
            text += '\n\n' + notes.join('\n\n');
        }
        else {
            text += ' ' + notes.join(' ');
        }
    }

    if (type === 'Character' && dual) {
        text += ' ^';
    }
    if (type === 'Transition') {
        text = '> ' + text;
    }
    if (align === 'Center') {
        text = '> ' + text.split('\n').join(' ') + ' <';
    }
    if (type === 'Scene Heading') {
        if (!(/^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i.test(text))) {
            text = '.' + text;
        }
        var synopsis = $(paragraph).find('SceneProperties Paragraph Text');
        if (synopsis.length) {
            text += '\n\n' + synopsis.map(function() {
                    return '= ' + $(this).text();
                }).get().join('\n\n');
        }
    }
    if (type !== 'Parenthetical' && type !== 'Dialogue') {
        text = '\n' + text;
    }
    if (type !== 'Center') {
        text += '\n';
    }

    if (text.replace(/\n/g, '') === '') {
        return '';
    }

    return text;
};

FdxConverter.prototype.toFountain = function(text) {
    var $ = this.$;

    var result = '';
    try {
        var doc = $.parseXML(text);
        var $fdx = $(doc);
        // title page
        var order = ['Title: ', 'Credit: ', 'Author: '];
        var processing = false;
        $fdx.find('FinalDraft TitlePage Content > Paragraph').each(function() {
            if (order.length === 0) {
                return;
            }
            var text = $(this).find('Text').text().trim();
            if (text === '') {
                processing = false;
            }
            else {
                if (!processing) {
                    result += order.shift();
                    processing = true;
                }
                result += text + '\n';
            }
        });

        // content
        var self = this;

        $fdx.find('FinalDraft > Content > Paragraph').each(function() {
            var dual = $(this).find('DualDialogue');
            if (dual.size()) {
                var set_dual = false;
                dual.find('Paragraph').each(function() {
                    result += self.parse(this, set_dual);
                    set_dual = true;
                });
            } else {
                result += self.parse(this);
            }
        });


    } catch (error) {
        result = "Sorry, I couldn't convert FinalDraft file :(\nerror: " + error.message;
    }
    return result;
};

module.exports = {
    FdxConverter: FdxConverter
};
},{}]},{},[1])(1)
});