'use strict';

var View = function(doc) {
    this.document = doc;
};

View.prototype.render = function(key, variables) {
    this.document.querySelectorAll('#menu_screen')[0].style.display = 'none';
    this.document.querySelectorAll('#selection_screen')[0].style.display = 'none';
    this.document.querySelectorAll('#show_screen')[0].style.display = 'none';
    this.document.querySelectorAll('#' + key)[0].style.display = 'block';

    // update DOM
    for (var k in variables) {
        if (variables.hasOwnProperty(k)) {
            this.document.querySelectorAll('#' + k)[0].innerHTML = variables[k].charAt(0).toUpperCase() + variables[k].slice(1);
        }
    }

};

View.prototype.renderClass = function(classes) {
    for (var k in classes) {
        if (classes.hasOwnProperty(k)) {
            if (this.document.querySelectorAll('#' + k)) {
                this.document.querySelectorAll('#' + k)[0].setAttribute('class', 'item ' + classes[k]);
            }
        }
    }
};

View.prototype.renderImg = function(imgs) {
    for (var k in imgs) {
        if (imgs.hasOwnProperty(k)) {
            if(this.document.querySelectorAll('#' + k)) {
                var el = this.document.querySelectorAll('#' + k)[0];
                el.setAttribute('src', './build/img/' + imgs[k] + '.png');
                el.setAttribute('alt', imgs[k]);
            }
        }
    }
}

View.prototype.updateSelectionTitle = function(selection) {
    this.document.querySelectorAll('#selection_name')[0].innerHTML = selection;
};

View.prototype.registerUIEventes = function(Game, player1, router) {
    var self = this;
    this.document.querySelectorAll('#selection_screen')[0].addEventListener('click', function(event) {
        var item;
        event.stopPropagation();
        if (event.target.nodeName === 'IMG') {
            item = event.target.alt;
        } else if (Game.elements.indexOf(event.target.id) >= 0) {
            item = event.target.id;
        }

        if(item) {
            player1.setSelection(item);
            router.goToState('show');
        }
    });
};

View.prototype.renderProgressBar = function(status, text) {
    var id = 'status_bar_result',
        el  = this.document.createElement('div'),
        t = this.document.createTextNode(text);

    el.appendChild(t);
    el.setAttribute('class', 'status-bar text-centered ' + status);
    el.setAttribute('id', id);
    el.setAttribute('data-show-screen', '');
    this.document.getElementById('show_screen').appendChild(el);
};

View.prototype.removeProgressBar = function(id) {
    var el = this.document.getElementById(id),
        elClass = el.getAttribute('class');

    el.setAttribute('class', elClass + ' status-bar--hidden');
}

View.prototype.checkProgressBar = function() {
    var bar = this.document.getElementById('status_bar_result');
    if (bar) {
        bar.parentNode.removeChild(bar);
    }
};

module.exports = View;
