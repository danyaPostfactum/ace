/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var dom = require("./lib/dom");
var event = require("./lib/event");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

/**
 * A set of methods for setting and retrieving the editor's scrollbar. 
 * @class ScrollBar
 **/

/**
 * Creates a new `ScrollBar`. `parent` is the owner of the scroll bar.
 * @param {DOMElement} parent A DOM element 
 *
 * @constructor
 **/
var ScrollBar = function(parent, renderer, orientation) {
    this.orientation = orientation || ScrollBar.VERTICAL;
    this.element = dom.createElement("div");
    if (this.orientation == ScrollBar.VERTICAL)
        this.element.className = "ace_scrollbar";
    else
        this.element.className = "ace_scrollbar-h";

    this.inner = dom.createElement("div");
    this.inner.className = "ace_scrollbar-inner";
    this.element.appendChild(this.inner);

    parent.appendChild(this.element);

    // in OSX lion the scrollbars appear to have no width. In this case resize the
    // element to show the scrollbar but still pretend that the scrollbar has a width
    // of 0px
    // in Firefox 6+ scrollbar is hidden if element has the same width as scrollbar
    // make element a little bit wider to retain scrollbar when page is zoomed 
    this.width = renderer.$scrollbarWidth || (renderer.$scrollbarWidth = dom.scrollbarWidth(parent.ownerDocument));
    var width = (this.width || 15) + 5;
    if (this.orientation == ScrollBar.VERTICAL) {
        this.inner.style.width = this.element.style.width = width + "px";
        this.element.style.overflowY = "scroll";
    } else {
        this.inner.style.height = this.element.style.height = width + "px";
        this.element.style.overflowX = "scroll";
    }
    this.setVisible(false);

    event.addListener(this.element, "scroll", this.onScroll.bind(this));
    event.addListener(this.element, "mousedown", event.preventDefault);
};

ScrollBar.VERTICAL = 0;
ScrollBar.HORIZONTAL = 1;

(function() {
    oop.implement(this, EventEmitter);

    this.setVisible = function(isVisible) {
        this.element.style.display = isVisible ? "" : "none";
        this.isVisible = isVisible;
    };
    
    /**
     * Emitted when the scroll bar, well, scrolls.
     * @event scroll
     * @param {Object} e Contains one property, `"data"`, which indicates the current scroll top position
     **/
    this.onScroll = function() {
        if (!this.skipEvent) {
            if (this.orientation == ScrollBar.VERTICAL)
                this.value = this.element.scrollTop;
            else
                this.value = this.element.scrollLeft;
            this._emit("scroll", {data: this.value});
        }
        this.skipEvent = false;
    };

    /**
     * Returns the width of the scroll bar.
     * @returns {Number}
     **/
    this.getWidth = function() {
        return this.isVisible ? this.width : 0;
    };

    /**
     * Sets the inner height of the scroll bar, in pixels.
     * @param {Number} height The new inner height
     **/
    this.setMaximum = function(maximum) {
        if (this.orientation == ScrollBar.VERTICAL)
            this.inner.style.height = maximum + "px";
        else
            this.inner.style.width = maximum + "px";
    };

    /**
     * Sets the scroll top of the scroll bar.
     * @param {Number} scrollTop The new scroll top
     **/
    // on chrome 17+ for small zoom levels after calling this function
    // this.element.scrollTop != scrollTop which makes page to scroll up.
    this.setValue = function(value) {
        if (this.value != value) {
            this.skipEvent = true;
            if (this.orientation == ScrollBar.VERTICAL)
                this.value = this.element.scrollTop = value;
            else
                this.value = this.element.scrollLeft = value;
        }
    };
}).call(ScrollBar.prototype);


exports.ScrollBar = ScrollBar;
});
