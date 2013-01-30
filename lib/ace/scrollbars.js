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
 * class ScrollBars
 *
 * A set of methods for setting and retrieving the editor's scrollbars. 
 *
 **/

/**
 * new ScrollBars(parent)
 * - parent (DOMElement): A DOM element 
 *
 * Creates a new `ScrollBars`. `parent` is the owner of the scroll bars.
 *
 **/
var ScrollBars = function(parent) {
    this.element = dom.createElement("div");
    this.element.className = "ace_scrollbars";

    this.inner = dom.createElement("div");
    this.inner.style.visibility = "hidden";
    this.element.appendChild(this.inner);

    this.element.style.overflowX = "auto";
    this.element.style.overflowY = "scroll";

    parent.appendChild(this.element);

    event.addListener(this.element, "scroll", this.onScroll.bind(this));
};

(function() {
    oop.implement(this, EventEmitter);

    this.vScrollBarAlwaysVisible = true;
    this.hScrollBarAlwaysVisible = false;

    /**
     * ScrollBars@scroll(e)
     *
     * Emitted when the scroll bars, well, scroll.
     *
     **/
    this.onScroll = function() {
        this._dispatchEvent("scroll");
    };

    /**
     * ScrollBars.getClientWidth() -> Number
     *
     * Returns client width
     *
     **/
    this.getClientWidth = function() {
        return this.element.clientWidth;
    };

    /**
     * ScrollBars.getClientHeight() -> Number
     *
     * Returns client height
     *
     **/
    this.getClientHeight = function() {
        return this.element.clientHeight;
    };

    /**
     * ScrollBars.setScrollWidth(scrollWidth)
     * - scrollWidth (Number): The new scroll width
     *
     * Sets the scroll width of the scroll bars, in pixels.
     *
    **/
    this.setScrollWidth = function(scrollWidth) {
        this.inner.style.width = scrollWidth + "px";
    };

    /**
     * ScrollBars.setScrollHeight(scrollHeight)
     * - scrollHeight (Number): The new scroll height
     *
     * Sets the scroll height of the scroll bars, in pixels.
     *
     **/
    this.setScrollHeight = function(scrollHeight) {
        this.inner.style.height = scrollHeight + "px";
    };

    /**
     * ScrollBars.setScrollLeft(scrollLeft)
     * - scrollLeft (Number): The new scroll top
     *
     * Sets the scroll left of the scroll bars.
     *
    **/
    this.setScrollLeft = function(scrollLeft) {
        this.element.scrollLeft = scrollLeft;
    };

    /**
     * ScrollBars.getScrollLeft()
     *
     * Returns the scroll left of the scroll bars.
     *
    **/
    this.getScrollLeft = function() {
        return this.element.scrollLeft;
    };

    /**
     * ScrollBars.setScrollTop(scrollTop)
     * - scrollTop (Number): The new scroll top
     *
     * Sets the scroll top of the scroll bars.
     *
     **/
    this.setScrollTop = function(scrollTop) {
        this.element.scrollTop = scrollTop;
    };

    /**
     * ScrollBars.getScrollTop()
     *
     * Returns the scroll top of the scroll bars.
     *
    **/
    this.getScrollTop = function() {
        return this.element.scrollTop;
    };

    /**
     * ScrollBars.setHScrollBarAlwaysVisible(alwaysVisible)
     * - alwaysVisible (Boolean): Set to `true` to make the horizontal scroll bar visible
     *
     * Identifies whether you want to show the horizontal ScrollBars or not.
    **/
    this.setHScrollBarAlwaysVisible = function(alwaysVisible) {
        if (this.hScrollBarAlwaysVisible != alwaysVisible) {
            this.hScrollBarAlwaysVisible = alwaysVisible;
            this.element.style.overflowX = alwaysVisible ? "scroll" : "auto";
        }
    };

    /**
     * ScrollBars.getHScrollBarAlwaysVisible()
     *
     * Returns true if horizontal scrollbar is always visible.
     *
    **/
    this.getHScrollBarAlwaysVisible = function() {
        return this.hScrollBarAlwaysVisible;
    };

    /**
     * ScrollBars.setVScrollBarAlwaysVisible(alwaysVisible)
     * - alwaysVisible (Boolean): Set to `true` to make the vertical scroll bar visible
     *
     * Identifies whether you want to show the vertical scrollbar or not.
    **/
    this.setVScrollBarAlwaysVisible = function(alwaysVisible) {
        if (this.vScrollBarAlwaysVisible != alwaysVisible) {
            this.vScrollBarAlwaysVisible = alwaysVisible;
            this.element.style.overflowY = alwaysVisible ? "scroll" : "auto";
        }
    };

    /**
     * ScrollBars.getVScrollBarAlwaysVisible()
     *
     * Returns true if vertical scrollbar is always visible.
     *
    **/
    this.getVScrollBarAlwaysVisible = function() {
        return this.vScrollBarAlwaysVisible;
    };


}).call(ScrollBars.prototype);

exports.ScrollBars = ScrollBars;
});
