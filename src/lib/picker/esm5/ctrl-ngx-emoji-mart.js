import { __values, __spread } from 'tslib';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Injectable, ChangeDetectorRef, ViewChild, ViewChildren, NgModule } from '@angular/core';
import { EmojiService, categories, EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

var svgs = {
    activity: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24m10 11h-5c.3-2.5 1.3-4.8 2-6.1a10 10 0 0 1 3 6.1m-9 0V2a10 10 0 0 1 4.4 1.6A18 18 0 0 0 15 11h-2zm-2 0H9a18 18 0 0 0-2.4-7.4A10 10 0 0 1 11 2.1V11zm0 2v9a10 10 0 0 1-4.4-1.6A18 18 0 0 0 9 13h2zm4 0a18 18 0 0 0 2.4 7.4 10 10 0 0 1-4.4 1.5V13h2zM5 4.9c.7 1.3 1.7 3.6 2 6.1H2a10 10 0 0 1 3-6.1M2 13h5c-.3 2.5-1.3 4.8-2 6.1A10 10 0 0 1 2 13m17 6.1c-.7-1.3-1.7-3.6-2-6.1h5a10 10 0 0 1-3 6.1",
    custom: "M10 1h3v21h-3zm10.186 4l1.5 2.598L3.5 18.098 2 15.5zM2 7.598L3.5 5l18.186 10.5-1.5 2.598z",
    flags: "M0 0l6 24h2L2 0zm21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.6 3h7.8l2 8H8.6l-2-8zm8.8 10l-2.9 1.9-.4-1.9h3.3zm3.6 0l-1.5-6h2l2 8H16l3-2z",
    foods: "M17 5c-1.8 0-2.9.4-3.7 1 .5-1.3 1.8-3 4.7-3a1 1 0 0 0 0-2c-3 0-4.6 1.3-5.5 2.5l-.2.2c-.6-1.9-1.5-3.7-3-3.7C8.5 0 7.7.3 7 1c-2 1.5-1.7 2.9-.5 4C3.6 5.2 0 7.4 0 13c0 4.6 5 11 9 11 2 0 2.4-.5 3-1 .6.5 1 1 3 1 4 0 9-6.4 9-11 0-6-4-8-7-8M8.2 2.5c.7-.5 1-.5 1-.5.4.2 1 1.4 1.4 3-1.6-.6-2.8-1.3-3-1.8l.6-.7M15 22c-1 0-1.2-.1-1.6-.4l-.1-.2a2 2 0 0 0-2.6 0l-.1.2c-.4.3-.5.4-1.6.4-2.8 0-7-5.4-7-9 0-6 4.5-6 5-6 2 0 2.5.4 3.4 1.2l.3.3a2 2 0 0 0 2.6 0l.3-.3c1-.8 1.5-1.2 3.4-1.2.5 0 5 .1 5 6 0 3.6-4.2 9-7 9",
    nature: "M15.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m10.43-8h-.02c-.97 0-2.14.79-3.02 1.5A13.88 13.88 0 0 0 12 .99c-1.28 0-2.62.13-3.87.51C7.24.8 6.07 0 5.09 0h-.02C3.35 0 .07 2.67 0 7.03c-.04 2.47.28 4.23 1.04 5 .26.27.88.69 1.3.9.19 3.17.92 5.23 2.53 6.37.9.64 2.19.95 3.2 1.1-.03.2-.07.4-.07.6 0 1.77 2.35 3 4 3s4-1.23 4-3c0-.2-.04-.4-.07-.59 2.57-.38 5.43-1.87 5.92-7.58.4-.22.89-.57 1.1-.8.77-.76 1.09-2.52 1.05-5C23.93 2.67 20.65 0 18.93 0M3.23 9.13c-.24.29-.84 1.16-.9 1.24A9.67 9.67 0 0 1 2 7.08c.05-3.28 2.48-4.97 3.1-5.03.25.02.72.27 1.26.65A7.95 7.95 0 0 0 4 7.82c-.14.55-.4.86-.79 1.31M12 22c-.9 0-1.95-.7-2-1 0-.65.47-1.24 1-1.6v.6a1 1 0 1 0 2 0v-.6c.52.36 1 .95 1 1.6-.05.3-1.1 1-2 1m3-3.48v.02a4.75 4.75 0 0 0-1.26-1.02c1.09-.52 2.24-1.33 2.24-2.22 0-1.84-1.78-2.2-3.98-2.2s-3.98.36-3.98 2.2c0 .89 1.15 1.7 2.24 2.22A4.8 4.8 0 0 0 9 18.54v-.03a6.1 6.1 0 0 1-2.97-.84c-1.3-.92-1.84-3.04-1.86-6.48l.03-.04c.5-.82 1.49-1.45 1.8-3.1C6 6 7.36 4.42 8.36 3.53c1.01-.35 2.2-.53 3.59-.53 1.45 0 2.68.2 3.73.57 1 .9 2.32 2.46 2.32 4.48.31 1.65 1.3 2.27 1.8 3.1l.1.18c-.06 5.97-1.95 7.01-4.9 7.19m6.63-8.2l-.11-.2a7.59 7.59 0 0 0-.74-.98 3.02 3.02 0 0 1-.79-1.32 7.93 7.93 0 0 0-2.35-5.12c.53-.38 1-.63 1.26-.65.64.07 3.05 1.77 3.1 5.03.02 1.81-.35 3.22-.37 3.24",
    objects: "M12 0a9 9 0 0 0-5 16.5V21s2 3 5 3 5-3 5-3v-4.5A9 9 0 0 0 12 0zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM9 17.5a9 9 0 0 0 6 0v.8a7 7 0 0 1-3 .7 7 7 0 0 1-3-.7v-.8zm.2 3a8.9 8.9 0 0 0 2.8.5c1 0 1.9-.2 2.8-.5-.6.7-1.6 1.5-2.8 1.5-1.1 0-2.1-.8-2.8-1.5zm5.5-8.1c-.8 0-1.1-.8-1.5-1.8-.5-1-.7-1.5-1.2-1.5s-.8.5-1.3 1.5c-.4 1-.8 1.8-1.6 1.8h-.3c-.5-.2-.8-.7-1.3-1.8l-.2-1A3 3 0 0 0 7 9a1 1 0 0 1 0-2c1.7 0 2 1.4 2.2 2.1.5-1 1.3-2 2.8-2 1.5 0 2.3 1.1 2.7 2.1.2-.8.6-2.2 2.3-2.2a1 1 0 1 1 0 2c-.2 0-.3.5-.3.7a6.5 6.5 0 0 1-.3 1c-.5 1-.8 1.7-1.7 1.7",
    people: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24m0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20M8 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4m8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-.8 8c-.7 1.2-1.8 2-3.3 2-1.5 0-2.7-.8-3.4-2H15m3-2H6a6 6 0 1 0 12 0",
    places: "M6.5 12a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5m11-3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5m5-5.5l-1-.4-.1-.1h.6c.6 0 1-.4 1-1 0-1-.9-2-2-2h-.6l-.8-1.7A3 3 0 0 0 16.8 2H7.2a3 3 0 0 0-2.8 2.3L3.6 6H3a2 2 0 0 0-2 2c0 .6.4 1 1 1h.6v.1l-1 .4a2 2 0 0 0-1.4 2l.7 7.6a1 1 0 0 0 1 .9H3v1c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-1h6v1c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-1h1.1a1 1 0 0 0 1-.9l.7-7.5a2 2 0 0 0-1.3-2.1M6.3 4.9c.1-.5.5-.9 1-.9h9.5c.4 0 .8.4 1 .9L19.2 9H4.7l1.6-4.1zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.2-3H2.8l-.7-6.6.9-.4h18l.9.4-.7 6.6z",
    recent: "M13 4h-2v7H9v2h2v2h2v-2h4v-2h-4zm-1-4a12 12 0 1 0 0 24 12 12 0 0 0 0-24m0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20",
    symbols: "M0 0h11v2H0zm4 11h3V6h4V4H0v2h4zm11.5 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-2.99a.5.5 0 0 1 0 .99c-.28 0-.5-.22-.5-.5s.22-.49.5-.49m6 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 2.99a.5.5 0 0 1-.5-.5.5.5 0 0 1 1 .01.5.5 0 0 1-.5.49m.5-9l-9 9 1.51 1.5 9-9zm-5-2c2.2 0 4-1.12 4-2.5V2s.98-.16 1.5.95C23 4.05 23 6 23 6s1-1.12 1-3.13C24-.02 21 0 21 0h-2v6.35A5.85 5.85 0 0 0 17 6c-2.2 0-4 1.12-4 2.5s1.8 2.5 4 2.5m-6.7 9.48L8.82 18.9a47.54 47.54 0 0 1-1.44 1.13c-.3-.3-.99-1.02-2.04-2.19.9-.83 1.47-1.46 1.72-1.89s.38-.87.38-1.33c0-.6-.27-1.18-.82-1.76-.54-.58-1.33-.87-2.35-.87-1 0-1.79.29-2.34.87-.56.6-.83 1.18-.83 1.79 0 .81.42 1.75 1.25 2.8a6.57 6.57 0 0 0-1.8 1.79 3.46 3.46 0 0 0-.51 1.83c0 .86.3 1.56.92 2.1a3.5 3.5 0 0 0 2.42.83c1.17 0 2.44-.38 3.81-1.14L8.23 24h2.82l-2.09-2.38 1.34-1.14zM3.56 14.1a1.02 1.02 0 0 1 .73-.28c.31 0 .56.08.75.25a.85.85 0 0 1 .28.66c0 .52-.42 1.11-1.26 1.78-.53-.65-.8-1.23-.8-1.74a.9.9 0 0 1 .3-.67m.18 7.9c-.43 0-.78-.12-1.06-.35-.28-.23-.41-.49-.41-.76 0-.6.5-1.3 1.52-2.09a31.23 31.23 0 0 0 2.25 2.44c-.92.5-1.69.76-2.3.76",
};
var AnchorsComponent = /** @class */ (function () {
    function AnchorsComponent() {
        this.categories = [];
        this.anchorClick = new EventEmitter();
        this.svgs = svgs;
    }
    AnchorsComponent.prototype.handleClick = function ($event, index) {
        this.anchorClick.emit({
            category: this.categories[index],
            index: index,
        });
    };
    return AnchorsComponent;
}());
AnchorsComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-mart-anchors',
                template: "\n  <div class=\"emoji-mart-anchors\">\n    <ng-container *ngFor=\"let category of categories; let idx = index\">\n      <span\n        *ngIf=\"category.anchor !== false\"\n        title=\"i18n.categories[category.id]\"\n        (click)=\"this.handleClick($event, idx)\"\n        class=\"emoji-mart-anchor\"\n        [class.emoji-mart-anchor-selected]=\"category.name === selected\"\n        [style.color]=\"category.name === selected ? color : null\"\n      >\n        <div>\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n            <path [attr.d]=\"svgs[category.id]\" />\n          </svg>\n        </div>\n        <span\n          class=\"emoji-mart-anchor-bar\"\n          [style.background-color]=\"color\"\n        ></span>\n      </span>\n    </ng-container>\n  </div>\n  ",
                styles: [],
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
AnchorsComponent.ctorParameters = function () { return []; };
AnchorsComponent.propDecorators = {
    "categories": [{ type: Input },],
    "color": [{ type: Input },],
    "selected": [{ type: Input },],
    "anchorClick": [{ type: Output },],
};
var EmojiFrequentlyService = /** @class */ (function () {
    function EmojiFrequentlyService() {
        this.NAMESPACE = 'emoji-mart';
        this.frequently = null;
        this.defaults = {};
        this.initialized = false;
        this.DEFAULTS = [
            '+1',
            'grinning',
            'kissing_heart',
            'heart_eyes',
            'laughing',
            'stuck_out_tongue_winking_eye',
            'sweat_smile',
            'joy',
            'scream',
            'disappointed',
            'unamused',
            'weary',
            'sob',
            'sunglasses',
            'heart',
            'poop',
        ];
    }
    EmojiFrequentlyService.prototype.init = function () {
        this.frequently = JSON.parse(localStorage.getItem(this.NAMESPACE + ".frequently") || 'null');
        this.initialized = true;
    };
    EmojiFrequentlyService.prototype.add = function (emoji) {
        if (!this.initialized) {
            this.init();
        }
        if (!this.frequently) {
            this.frequently = this.defaults;
        }
        if (!this.frequently[emoji.id]) {
            this.frequently[emoji.id] = 0;
        }
        this.frequently[emoji.id] += 1;
        localStorage.setItem(this.NAMESPACE + ".last", emoji.id);
        localStorage.setItem(this.NAMESPACE + ".frequently", JSON.stringify(this.frequently));
    };
    EmojiFrequentlyService.prototype.get = function (perLine) {
        var _this = this;
        if (!this.initialized) {
            this.init();
        }
        if (this.frequently === null) {
            this.defaults = {};
            var result = [];
            for (var i = 0; i < perLine; i++) {
                this.defaults[this.DEFAULTS[i]] = perLine - i;
                result.push(this.DEFAULTS[i]);
            }
            return result;
        }
        var quantity = perLine * 4;
        var frequentlyKeys = Object.keys(this.frequently);
        var sorted = frequentlyKeys
            .sort(function (a, b) { return ((_this.frequently))[a] - ((_this.frequently))[b]; })
            .reverse();
        var sliced = sorted.slice(0, quantity);
        var last = localStorage.getItem(this.NAMESPACE + ".last");
        if (last && sliced.indexOf(last) === -1) {
            sliced.pop();
            sliced.push(last);
        }
        return sliced;
    };
    return EmojiFrequentlyService;
}());
EmojiFrequentlyService.decorators = [
    { type: Injectable },
];
EmojiFrequentlyService.ctorParameters = function () { return []; };
var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(ref, emojiService, frequently) {
        this.ref = ref;
        this.emojiService = emojiService;
        this.frequently = frequently;
        this.hasStickyPosition = true;
        this.name = '';
        this.native = true;
        this.perLine = 9;
        this.recent = [];
        this.custom = [];
        this.hideObsolete = true;
        this.emojiOver = new EventEmitter();
        this.emojiLeave = new EventEmitter();
        this.emojiClick = new EventEmitter();
        this.containerStyles = {};
        this.labelStyles = {};
        this.labelSpanStyles = {};
        this.margin = 0;
        this.minMargin = 0;
        this.maxMargin = 0;
        this.top = 0;
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.emojis = this.getEmojis();
        if (!this.emojis) {
            this.containerStyles = { display: 'none' };
        }
        if (!this.hasStickyPosition) {
            this.labelStyles = { height: 28 };
            this.labelSpanStyles = { position: 'absolute' };
        }
    };
    CategoryComponent.prototype.ngAfterViewInit = function () {
        this.parent = ((this.container)).nativeElement.parentNode.parentNode;
        this.memoizeSize();
    };
    CategoryComponent.prototype.memoizeSize = function () {
        var _a = ((this.container)).nativeElement.getBoundingClientRect(), top = _a.top, height = _a.height;
        var parentTop = ((this.parent)).getBoundingClientRect().top;
        var labelHeight = ((this.label)).nativeElement.getBoundingClientRect().height;
        this.top = top - parentTop + ((this.parent)).scrollTop;
        if (height === 0) {
            this.maxMargin = 0;
        }
        else {
            this.maxMargin = height - labelHeight;
        }
    };
    CategoryComponent.prototype.handleScroll = function (scrollTop) {
        var margin = scrollTop - this.top;
        margin = margin < this.minMargin ? this.minMargin : margin;
        margin = margin > this.maxMargin ? this.maxMargin : margin;
        if (margin === this.margin) {
            return;
        }
        if (!this.hasStickyPosition) {
            ((this.label)).nativeElement.style.top = margin + "px";
        }
        this.margin = margin;
        return true;
    };
    CategoryComponent.prototype.getEmojis = function () {
        var _this = this;
        if (this.name === 'Recent') {
            var frequentlyUsed = this.recent || this.frequently.get(this.perLine);
            if (!frequentlyUsed || !frequentlyUsed.length) {
                frequentlyUsed = this.frequently.get(this.perLine);
            }
            if (frequentlyUsed.length) {
                this.emojis = frequentlyUsed
                    .map(function (id) {
                    var emoji = _this.custom.filter(function (e) { return e.id === id; })[0];
                    if (emoji) {
                        return emoji;
                    }
                    return id;
                })
                    .filter(function (id) { return !!_this.emojiService.getData(id); });
            }
            if ((!this.emojis || this.emojis.length === 0) && frequentlyUsed.length > 0) {
                return null;
            }
        }
        if (this.emojis) {
            this.emojis = this.emojis.slice(0);
        }
        return this.emojis;
    };
    CategoryComponent.prototype.updateDisplay = function (display) {
        this.containerStyles.display = display;
        this.ref.detectChanges();
    };
    CategoryComponent.prototype.trackById = function (index, item) {
        return item;
    };
    return CategoryComponent;
}());
CategoryComponent.decorators = [
    { type: Component, args: [{
                selector: '[emoji-category]',
                template: "\n  <div\n    #container\n    class=\"emoji-mart-category\"\n    [class.emoji-mart-no-results]=\"emojis && !emojis.length\"\n    [ngStyle]=\"containerStyles\"\n  >\n    <div\n      [ngStyle]=\"labelStyles\"\n      [attr.data-name]=\"name\"\n      class=\"emoji-mart-category-label\"\n    >\n      <span style=\"labelSpanStyles\" #label>\n        {{ i18n.categories[id] }}\n      </span>\n    </div>\n    <ng-template [ngIf]=\"emojis\">\n      <ngx-emoji\n        *ngFor=\"let emoji of emojis; trackBy: trackById\"\n        [emoji]=\"emoji\"\n        [size]=\"emojiSize\"\n        [skin]=\"emojiSkin\"\n        [native]=\"emojiNative\"\n        [set]=\"emojiSet\"\n        [sheetSize]=\"emojiSheetSize\"\n        [forceSize]=\"emojiForceSize\"\n        [tooltip]=\"emojiTooltip\"\n        [hideObsolete]=\"hideObsolete\"\n        (emojiOver)=\"emojiOver.emit($event)\"\n        (emojiLeave)=\"emojiLeave.emit($event)\"\n        (emojiClick)=\"emojiClick.emit($event)\"\n      >\n      </ngx-emoji>\n    </ng-template>\n    <div *ngIf=\"emojis && !emojis.length\">\n      <div>\n        <ngx-emoji\n          emoji=\"sleuth_or_spy\"\n          size=\"38\"\n          [skin]=\"emojiSkin\"\n          [native]=\"emojiNative\"\n          [set]=\"emojiSet\"\n          [sheetSize]=\"emojiSheetSize\"\n          [forceSize]=\"emojiForceSize\"\n          [tooltip]=\"emojiTooltip\"\n          >\n        </ngx-emoji>\n      </div>\n      <div className=\"emoji-mart-no-results-label\">\n        {{ i18n.notfound }}\n      </div>\n    </div>\n  </div>\n  ",
                styles: [],
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
CategoryComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
    { type: EmojiService, },
    { type: EmojiFrequentlyService, },
]; };
CategoryComponent.propDecorators = {
    "emojis": [{ type: Input },],
    "hasStickyPosition": [{ type: Input },],
    "name": [{ type: Input },],
    "native": [{ type: Input },],
    "perLine": [{ type: Input },],
    "recent": [{ type: Input },],
    "custom": [{ type: Input },],
    "i18n": [{ type: Input },],
    "id": [{ type: Input },],
    "hideObsolete": [{ type: Input },],
    "emojiNative": [{ type: Input },],
    "emojiSkin": [{ type: Input },],
    "emojiSize": [{ type: Input },],
    "emojiSet": [{ type: Input },],
    "emojiSheetSize": [{ type: Input },],
    "emojiForceSize": [{ type: Input },],
    "emojiTooltip": [{ type: Input },],
    "emojiOver": [{ type: Output },],
    "emojiLeave": [{ type: Output },],
    "emojiClick": [{ type: Output },],
    "container": [{ type: ViewChild, args: ['container',] },],
    "label": [{ type: ViewChild, args: ['label',] },],
};
function uniq(arr) {
    return arr.reduce(function (acc, item) {
        if (acc.indexOf(item) === -1) {
            acc.push(item);
        }
        return acc;
    }, []);
}
function intersect(a, b) {
    var uniqA = uniq(a);
    var uniqB = uniq(b);
    return uniqA.filter(function (item) { return uniqB.indexOf(item) >= 0; });
}
function measureScrollbar() {
    if (typeof document === 'undefined') {
        return 0;
    }
    var div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    document.body.appendChild(div);
    var scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
}
var EmojiSearch = /** @class */ (function () {
    function EmojiSearch(emojiService) {
        var _this = this;
        this.emojiService = emojiService;
        this.originalPool = {};
        this.index = {};
        this.emojisList = {};
        this.emoticonsList = {};
        this.emojiSearch = {};
        var _loop_1 = function (emojiData) {
            var short_names = emojiData.short_names, emoticons = emojiData.emoticons;
            var id = short_names[0];
            emoticons.forEach(function (emoticon) {
                if (_this.emoticonsList[emoticon]) {
                    return;
                }
                _this.emoticonsList[emoticon] = id;
            });
            this_1.emojisList[id] = this_1.emojiService.getSanitizedData(id);
            this_1.originalPool[id] = emojiData;
        };
        var this_1 = this;
        try {
            for (var _a = __values(this.emojiService.emojis), _b = _a.next(); !_b.done; _b = _a.next()) {
                var emojiData = _b.value;
                _loop_1(emojiData);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    }
    EmojiSearch.prototype.addCustomToPool = function (custom, pool) {
        var _this = this;
        custom.forEach(function (emoji) {
            var emojiId = emoji.id || emoji.short_names[0];
            if (emojiId && !pool[emojiId]) {
                pool[emojiId] = _this.emojiService.getData(emoji);
                _this.emojisList[emojiId] = _this.emojiService.getSanitizedData(emoji);
            }
        });
    };
    EmojiSearch.prototype.search = function (value, emojisToShowFilter, maxResults, include, exclude, custom) {
        var _this = this;
        if (maxResults === void 0) { maxResults = 75; }
        if (include === void 0) { include = []; }
        if (exclude === void 0) { exclude = []; }
        if (custom === void 0) { custom = []; }
        this.addCustomToPool(custom, this.originalPool);
        var results;
        var pool = this.originalPool;
        if (value.length) {
            if (value === '-' || value === '-1') {
                return [this.emojisList['-1']];
            }
            var values = value.toLowerCase().split(/[\s|,|\-|_]+/);
            var allResults = [];
            if (values.length > 2) {
                values = [values[0], values[1]];
            }
            if (include.length || exclude.length) {
                pool = {};
                categories.forEach(function (category) {
                    var isIncluded = include && include.length
                        ? include.indexOf(category.id) > -1
                        : true;
                    var isExcluded = exclude && exclude.length
                        ? exclude.indexOf(category.id) > -1
                        : false;
                    if (!isIncluded || isExcluded) {
                        return;
                    }
                    category.emojis.forEach(function (emojiId) { return pool[emojiId] = _this.emojiService.names[emojiId]; });
                });
                if (custom.length) {
                    var customIsIncluded = include && include.length ? include.indexOf('custom') > -1 : true;
                    var customIsExcluded = exclude && exclude.length ? exclude.indexOf('custom') > -1 : false;
                    if (customIsIncluded && !customIsExcluded) {
                        this.addCustomToPool(custom, pool);
                    }
                }
            }
            allResults = values
                .map(function (v) {
                var aPool = pool;
                var aIndex = _this.index;
                var length = 0;
                var _loop_2 = function (charIndex) {
                    var char = v[charIndex];
                    length++;
                    if (!aIndex[char]) {
                        aIndex[char] = {};
                    }
                    aIndex = aIndex[char];
                    if (!aIndex.results) {
                        var scores_1 = {};
                        aIndex.results = [];
                        aIndex.pool = {};
                        try {
                            for (var _a = __values(Object.keys(aPool)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var id = _b.value;
                                var emoji = aPool[id];
                                if (!_this.emojiSearch[id]) {
                                    _this.emojiSearch[id] = _this.buildSearch(emoji.short_names, emoji.name, emoji.keywords, emoji.emoticons);
                                }
                                var query = _this.emojiSearch[id];
                                var sub = v.substr(0, length);
                                var subIndex = query.indexOf(sub);
                                if (subIndex !== -1) {
                                    var score = subIndex + 1;
                                    if (sub === id) {
                                        score = 0;
                                    }
                                    aIndex.results.push(_this.emojisList[id]);
                                    aIndex.pool[id] = emoji;
                                    scores_1[id] = score;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        aIndex.results.sort(function (a, b) {
                            var aScore = scores_1[a.id];
                            var bScore = scores_1[b.id];
                            return aScore - bScore;
                        });
                    }
                    aPool = aIndex.pool;
                    var e_2, _c;
                };
                for (var charIndex = 0; charIndex < v.length; charIndex++) {
                    _loop_2(charIndex);
                }
                return aIndex.results;
            })
                .filter(function (a) { return a; });
            if (allResults.length > 1) {
                results = intersect.apply(null, allResults);
            }
            else if (allResults.length) {
                results = allResults[0];
            }
            else {
                results = [];
            }
        }
        if (results) {
            if (emojisToShowFilter) {
                results = results.filter(function (result) { return emojisToShowFilter(_this.emojiService.names[result.id]); });
            }
            if (results && results.length > maxResults) {
                results = results.slice(0, maxResults);
            }
        }
        return results || null;
    };
    EmojiSearch.prototype.buildSearch = function (short_names, name, keywords, emoticons) {
        var search = [];
        var addToSearch = function (strings, split) {
            if (!strings) {
                return;
            }
            (Array.isArray(strings) ? strings : [strings]).forEach(function (string) {
                (split ? string.split(/[-|_|\s]+/) : [string]).forEach(function (s) {
                    s = s.toLowerCase();
                    if (search.indexOf(s) === -1) {
                        search.push(s);
                    }
                });
            });
        };
        addToSearch(short_names, true);
        addToSearch(name, true);
        addToSearch(keywords, false);
        addToSearch(emoticons, false);
        return search.join(',');
    };
    return EmojiSearch;
}());
EmojiSearch.decorators = [
    { type: Injectable },
];
EmojiSearch.ctorParameters = function () { return [
    { type: EmojiService, },
]; };
var PreviewComponent = /** @class */ (function () {
    function PreviewComponent(ref, emojiService) {
        this.ref = ref;
        this.emojiService = emojiService;
        this.skinChange = new EventEmitter();
    }
    PreviewComponent.prototype.ngOnChanges = function () {
        if (!this.emoji) {
            return;
        }
        this.emojiData = this.emojiService.getData(this.emoji);
        var knownEmoticons = [];
        var listedEmoticons = [];
        var emoitcons = this.emojiData.emoticons || [];
        emoitcons.forEach(function (emoticon) {
            if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
                return;
            }
            knownEmoticons.push(emoticon.toLowerCase());
            listedEmoticons.push(emoticon);
        });
        this.listedEmoticons = listedEmoticons;
    };
    return PreviewComponent;
}());
PreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-preview',
                template: "\n  <div class=\"emoji-mart-preview\" *ngIf=\"emoji\">\n    <div class=\"emoji-mart-preview-emoji\">\n      <ngx-emoji [emoji]=\"emoji\" [size]=\"38\"\n        [native]=\"emojiNative\"\n        [size]=\"emojiSize\"\n        [skin]=\"emojiSkin\"\n        [set]=\"emojiSet\"\n        [sheetSize]=\"emojiSheetSize\"\n        [backgroundImageFn]=\"emojiBackgroundImageFn\"\n      >\n      </ngx-emoji>\n    </div>\n    <div class=\"emoji-mart-preview-data\">\n      <div class=\"emoji-mart-preview-name\">{{ emojiData.name }}</div>\n      <div class=\"emoji-mart-preview-shortnames\">\n        <span class=\"emoji-mart-preview-shortname\" *ngFor=\"let short_name of emojiData.short_names\">\n          :{{ short_name }}:\n        </span>\n      </div>\n      <div class=\"emoji-mart-preview-emoticons\">\n        <span class=\"emoji-mart-preview-emoticon\" *ngFor=\"let emoticon of listedEmoticons\">\n          {{ emoticon }}\n        </span>\n      </div>\n    </div>\n  </div>\n  <div class=\"emoji-mart-preview\" *ngIf=\"!emoji\">\n    <div class=\"emoji-mart-preview-emoji\">\n      <ngx-emoji *ngIf=\"idleEmoji && idleEmoji.length\"\n        [native]=\"emojiNative\"\n        [skin]=\"emojiSkin\"\n        [set]=\"emojiSet\"\n        [emoji]=\"idleEmoji\"\n        [backgroundImageFn]=\"emojiBackgroundImageFn\"\n        [size]=\"38\">\n      </ngx-emoji>\n    </div>\n    <div class=\"emoji-mart-preview-data\">\n      <span class=\"emoji-mart-title-label\">{{ title }}</span>\n    </div>\n    <div class=\"emoji-mart-preview-skins\">\n      <emoji-skins [skin]=\"emojiSkin\" (change)=\"skinChange.emit($event)\">\n      </emoji-skins>\n    </div>\n  </div>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
PreviewComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
    { type: EmojiService, },
]; };
PreviewComponent.propDecorators = {
    "title": [{ type: Input },],
    "emoji": [{ type: Input },],
    "idleEmoji": [{ type: Input },],
    "emojiNative": [{ type: Input },],
    "emojiSize": [{ type: Input },],
    "emojiSkin": [{ type: Input },],
    "emojiSet": [{ type: Input },],
    "emojiSheetSize": [{ type: Input },],
    "emojiBackgroundImageFn": [{ type: Input },],
    "skinChange": [{ type: Output },],
};
var RECENT_CATEGORY = {
    id: 'recent',
    name: 'Recent',
    emojis: null,
};
var SEARCH_CATEGORY = {
    id: 'search',
    name: 'Search',
    emojis: null,
    anchor: false,
};
var CUSTOM_CATEGORY = {
    id: 'custom',
    name: 'Custom',
    emojis: (([])),
};
var I18N = {
    search: 'Search',
    notfound: 'No Emoji Found',
    categories: {
        search: 'Search Results',
        recent: 'Frequently Used',
        people: 'Smileys & People',
        nature: 'Animals & Nature',
        foods: 'Food & Drink',
        activity: 'Activity',
        places: 'Travel & Places',
        objects: 'Objects',
        symbols: 'Symbols',
        flags: 'Flags',
        custom: 'Custom',
    },
};
var PickerComponent = /** @class */ (function () {
    function PickerComponent(frequently) {
        var _this = this;
        this.frequently = frequently;
        this.perLine = 9;
        this.i18n = {};
        this.style = {};
        this.title = 'Emoji Mart™';
        this.emoji = 'department_store';
        this.color = '#ae65c5';
        this.hideObsolete = true;
        this.categories = [];
        this.set = 'apple';
        this.skin = 1;
        this.native = false;
        this.emojiSize = 24;
        this.sheetSize = 64;
        this.showPreview = true;
        this.emojiTooltip = false;
        this.autoFocus = false;
        this.custom = [];
        this.hideRecent = true;
        this.include = [];
        this.exclude = [];
        this.emojiClick = new EventEmitter();
        this.scrollHeight = 0;
        this.clientHeight = 0;
        this.firstRender = true;
        this.RECENT_CATEGORY = RECENT_CATEGORY;
        this.CUSTOM_CATEGORY = CUSTOM_CATEGORY;
        this.NAMESPACE = 'emoji-mart';
        this.measureScrollbar = 0;
        this.backgroundImageFn = function (set, sheetSize) { return "https://unpkg.com/emoji-datasource-" + _this.set + "@4.0.3/img/" + _this.set + "/sheets-256/" + _this.sheetSize + ".png"; };
    }
    PickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.measureScrollbar = measureScrollbar();
        this.i18n = Object.assign({}, I18N, this.i18n);
        this.i18n.categories = Object.assign({}, I18N.categories, this.i18n.categories);
        this.skin = JSON.parse(localStorage.getItem(this.NAMESPACE + ".skin") || 'null') || this.skin;
        var allCategories = __spread(categories);
        if (this.custom.length > 0) {
            CUSTOM_CATEGORY.emojis = this.custom.map(function (emoji) {
                return Object.assign({}, emoji, { id: emoji.short_names[0], custom: true });
            });
            allCategories.push(CUSTOM_CATEGORY);
        }
        if (this.include !== undefined) {
            allCategories.sort(function (a, b) {
                if (_this.include.indexOf(a.id) > _this.include.indexOf(b.id)) {
                    return 1;
                }
                return 0;
            });
        }
        for (var categoryIndex = 0; categoryIndex < allCategories.length; categoryIndex++) {
            var category = allCategories[categoryIndex];
            var isIncluded = this.include && this.include.length
                ? this.include.indexOf(category.id) > -1
                : true;
            var isExcluded = this.exclude && this.exclude.length
                ? this.exclude.indexOf(category.id) > -1
                : false;
            if (!isIncluded || isExcluded) {
                continue;
            }
            if (this.emojisToShowFilter) {
                var newEmojis = [];
                var emojis = category.emojis;
                for (var emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
                    var emoji = emojis[emojiIndex];
                    if (this.emojisToShowFilter(emoji)) {
                        newEmojis.push(emoji);
                    }
                }
                if (newEmojis.length) {
                    var newCategory = {
                        emojis: newEmojis,
                        name: category.name,
                        id: category.id,
                    };
                    this.categories.push(newCategory);
                }
            }
            else {
                this.categories.push(category);
            }
        }
        var includeRecent = this.include && this.include.length
            ? this.include.indexOf(RECENT_CATEGORY.id) > -1
            : true;
        var excludeRecent = this.exclude && this.exclude.length
            ? this.exclude.indexOf(RECENT_CATEGORY.id) > -1
            : false;
        if (includeRecent && !excludeRecent) {
            this.hideRecent = false;
            this.categories.unshift(RECENT_CATEGORY);
        }
        if (this.categories[0]) {
            this.categories[0].first = true;
        }
        this.categories.unshift(SEARCH_CATEGORY);
        this.selected = this.categories.filter(function (category) { return category.first; })[0].name;
    };
    PickerComponent.prototype.ngAfterViewInit = function () {
        this.updateCategoriesSize();
    };
    PickerComponent.prototype.updateCategoriesSize = function () {
        ((this.categoryRefs)).forEach(function (component) { return component.memoizeSize(); });
        if (this.scrollRef) {
            var target = this.scrollRef.nativeElement;
            this.scrollHeight = target.scrollHeight;
            this.clientHeight = target.clientHeight;
        }
    };
    PickerComponent.prototype.handleAnchorClick = function ($event) {
        var _this = this;
        var component = ((this.categoryRefs)).find(function (n) { return n.id === $event.category.id; });
        var scrollToComponent = null;
        scrollToComponent = function () {
            if (component) {
                var top = component.top;
                if ($event.category.first) {
                    top = 0;
                }
                else {
                    top += 1;
                }
                ((_this.scrollRef)).nativeElement.scrollTop = top;
            }
        };
        if (SEARCH_CATEGORY.emojis) {
            window.requestAnimationFrame(scrollToComponent);
        }
        else {
            scrollToComponent();
        }
    };
    PickerComponent.prototype.categoryTrack = function (index, item) {
        return item.id;
    };
    PickerComponent.prototype.handleScroll = function () {
        if (!this.scrollRef) {
            return;
        }
        var activeCategory = null;
        var scrollTop;
        if (SEARCH_CATEGORY.emojis) {
            activeCategory = SEARCH_CATEGORY;
        }
        else {
            var target = this.scrollRef.nativeElement;
            scrollTop = target.scrollTop;
            var scrollingDown = scrollTop > (this.scrollTop || 0);
            var minTop = 0;
            var _loop_3 = function (i, l) {
                var ii = scrollingDown ? this_2.categories.length - 1 - i : i;
                var category = this_2.categories[ii];
                var component = ((this_2.categoryRefs)).find(function (n) { return n.id === category.id; });
                if (component) {
                    var active = component.handleScroll(scrollTop);
                    if (!minTop || component.top < minTop) {
                        if (component.top > 0) {
                            minTop = component.top;
                        }
                    }
                    if (active && !activeCategory) {
                        activeCategory = category;
                    }
                }
            };
            var this_2 = this;
            for (var i = 0, l = this.categories.length; i < l; i++) {
                _loop_3(i, l);
            }
            if (scrollTop < minTop) {
                activeCategory = this.categories.filter(function (category) { return !(category.anchor === false); })[0];
            }
            else if (scrollTop + this.clientHeight >= this.scrollHeight) {
                activeCategory = this.categories[this.categories.length - 1];
            }
        }
        if (activeCategory) {
            var categoryName = activeCategory.name;
            if (this.selected !== categoryName) {
                this.selected = categoryName;
            }
        }
        this.scrollTop = scrollTop;
    };
    PickerComponent.prototype.handleSearch = function ($emojis) {
        SEARCH_CATEGORY.emojis = $emojis;
        try {
            for (var _a = __values(((this.categoryRefs)).toArray()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var component = _b.value;
                if (component.name === 'Search') {
                    component.emojis = $emojis;
                    component.updateDisplay($emojis ? 'inherit' : 'none');
                }
                else {
                    component.updateDisplay($emojis ? 'none' : 'inherit');
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        ((this.scrollRef)).nativeElement.scrollTop = 0;
        this.handleScroll();
        var e_3, _c;
    };
    PickerComponent.prototype.handleEmojiOver = function ($event) {
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        var emojiData = CUSTOM_CATEGORY.emojis.find(function (customEmoji) { return customEmoji.id === $event.emoji.id; });
        if (emojiData) {
            $event.emoji = Object.assign({}, emojiData);
        }
        this.previewEmoji = $event.emoji;
        clearTimeout(this.leaveTimeout);
    };
    PickerComponent.prototype.handleEmojiLeave = function ($event) {
        var _this = this;
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        this.leaveTimeout = setTimeout(function () {
            _this.previewEmoji = null;
            ((_this.previewRef)).ref.markForCheck();
        }, 16);
    };
    PickerComponent.prototype.handleEmojiClick = function ($event) {
        var _this = this;
        this.emojiClick.emit($event);
        if (!this.hideRecent && !this.recent) {
            this.frequently.add($event.emoji);
        }
        var component = ((this.categoryRefs)).toArray()[1];
        if (component) {
            var maxMargin_1 = component.maxMargin;
            component.emojis = this.frequently.get(maxMargin_1);
            component.ref.markForCheck();
            window.requestAnimationFrame(function () {
                if (!_this.scrollRef) {
                    return;
                }
                component.memoizeSize();
                if (maxMargin_1 === component.maxMargin) {
                    return;
                }
                _this.updateCategoriesSize();
                _this.handleScroll();
                if (SEARCH_CATEGORY.emojis) {
                    component.updateDisplay('none');
                }
            });
        }
    };
    PickerComponent.prototype.handleSkinChange = function (skin) {
        this.skin = skin;
        localStorage.setItem(this.NAMESPACE + ".skin", String(skin));
    };
    return PickerComponent;
}());
PickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-mart',
                template: "<div\n  [style.width.px]=\"perLine * (emojiSize + 12) + 12 + 2 + measureScrollbar\"\n  [ngStyle]=\"style\"\n  class=\"emoji-mart\">\n  <div class=\"emoji-mart-bar\">\n    <emoji-mart-anchors\n      [categories]=\"categories\"\n      (anchorClick)=\"handleAnchorClick($event)\"\n      [color]=\"color\"\n      [selected]=\"selected\"\n    >\n    </emoji-mart-anchors>\n  </div>\n  <emoji-search\n    [i18n]=\"i18n\"\n    (search)=\"handleSearch($event)\"\n    [include]=\"include\"\n    [exclude]=\"exclude\"\n    [custom]=\"custom\"\n    [autoFocus]=\"autoFocus\"\n    [emojisToShowFilter]=\"emojisToShowFilter\"\n  >\n  </emoji-search>\n  <div\n    #scrollRef\n    class=\"emoji-mart-scroll\"\n    (scroll)=\"handleScroll()\"\n  >\n    <div emoji-category\n      *ngFor=\"let category of categories; let idx = index; trackBy: categoryTrack\"\n      #categoryRef\n      [id]=\"category.id\"\n      [name]=\"category.name\"\n      [emojis]=\"category.emojis\"\n      [perLine]=\"perLine\"\n      [native]=\"native\"\n      [hasStickyPosition]=\"native\"\n      [i18n]=\"i18n\"\n      [hideObsolete]=\"hideObsolete\"\n      [custom]=\"category.id == RECENT_CATEGORY.id ? CUSTOM_CATEGORY.emojis : undefined\"\n      [recent]=\"category.id == RECENT_CATEGORY.id ? recent : undefined\"\n      [emojiNative]=\"native\"\n      [emojiSkin]=\"skin\"\n      [emojiSize]=\"emojiSize\"\n      [emojiSet]=\"set\"\n      [emojiSheetSize]=\"sheetSize\"\n      [emojiForceSize]=\"native\"\n      [emojiTooltip]=\"emojiTooltip\"\n      (emojiOver)=\"handleEmojiOver($event)\"\n      (emojiLeave)=\"handleEmojiLeave($event)\"\n      (emojiClick)=\"handleEmojiClick($event)\"\n    >\n    </div>\n</div>\n<div class=\"emoji-mart-bar\" *ngIf=\"showPreview\">\n  <emoji-preview\n    #previewRef\n    [title]=\"title\"\n    [emoji]=\"previewEmoji\"\n    [idleEmoji]=\"emoji\"\n    [emojiNative]=\"native\"\n    [emojiSize]=\"38\"\n    [emojiSkin]=\"skin\"\n    [emojiSet]=\"set\"\n    [emojiSheetSize]=\"sheetSize\"\n    [emojiBackgroundImageFn]=\"backgroundImageFn\"\n    (skinChange)=\"handleSkinChange($event)\"\n  ></emoji-preview>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
PickerComponent.ctorParameters = function () { return [
    { type: EmojiFrequentlyService, },
]; };
PickerComponent.propDecorators = {
    "perLine": [{ type: Input },],
    "i18n": [{ type: Input },],
    "style": [{ type: Input },],
    "title": [{ type: Input },],
    "emoji": [{ type: Input },],
    "color": [{ type: Input },],
    "hideObsolete": [{ type: Input },],
    "categories": [{ type: Input },],
    "set": [{ type: Input },],
    "skin": [{ type: Input },],
    "native": [{ type: Input },],
    "emojiSize": [{ type: Input },],
    "sheetSize": [{ type: Input },],
    "emojisToShowFilter": [{ type: Input },],
    "showPreview": [{ type: Input },],
    "emojiTooltip": [{ type: Input },],
    "autoFocus": [{ type: Input },],
    "custom": [{ type: Input },],
    "hideRecent": [{ type: Input },],
    "include": [{ type: Input },],
    "exclude": [{ type: Input },],
    "emojiClick": [{ type: Output },],
    "scrollRef": [{ type: ViewChild, args: ['scrollRef',] },],
    "previewRef": [{ type: ViewChild, args: ['previewRef',] },],
    "categoryRefs": [{ type: ViewChildren, args: ['categoryRef',] },],
    "backgroundImageFn": [{ type: Input },],
};
var SearchComponent = /** @class */ (function () {
    function SearchComponent(emojiSearch) {
        this.emojiSearch = emojiSearch;
        this.maxResults = 75;
        this.autoFocus = false;
        this.include = [];
        this.exclude = [];
        this.custom = [];
        this.search = new EventEmitter();
        this.query = '';
    }
    SearchComponent.prototype.ngAfterViewInit = function () {
        if (this.autoFocus && this.inputRef) {
            this.inputRef.nativeElement.focus();
        }
    };
    SearchComponent.prototype.handleChange = function () {
        this.search.emit(this.emojiSearch.search(this.query, this.emojisToShowFilter, this.maxResults, this.include, this.exclude, this.custom));
    };
    return SearchComponent;
}());
SearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-search',
                template: "\n  <div class=\"emoji-mart-search\">\n    <input #inputRef type=\"text\"\n      [placeholder]=\"i18n.search\" [autofocus]=\"autoFocus\"\n      [(ngModel)]=\"query\" (ngModelChange)=\"handleChange()\"\n    />\n  </div>\n  ",
                styles: [],
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
SearchComponent.ctorParameters = function () { return [
    { type: EmojiSearch, },
]; };
SearchComponent.propDecorators = {
    "maxResults": [{ type: Input },],
    "autoFocus": [{ type: Input },],
    "i18n": [{ type: Input },],
    "include": [{ type: Input },],
    "exclude": [{ type: Input },],
    "custom": [{ type: Input },],
    "emojisToShowFilter": [{ type: Input },],
    "search": [{ type: Output },],
    "inputRef": [{ type: ViewChild, args: ['inputRef',] },],
};
var SkinComponent = /** @class */ (function () {
    function SkinComponent() {
        this.change = new EventEmitter();
        this.opened = false;
        this.skinTones = [1, 2, 3, 4, 5, 6];
    }
    SkinComponent.prototype.toggleOpen = function () {
        this.opened = !this.opened;
    };
    SkinComponent.prototype.handleClick = function (skin) {
        if (!this.opened) {
            this.opened = true;
            return;
        }
        this.opened = false;
        if (skin !== this.skin) {
            this.change.emit(skin);
        }
    };
    return SkinComponent;
}());
SkinComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-skins',
                template: "\n  <div>\n    <div class=\"emoji-mart-skin-swatches\" [class.emoji-mart-skin-swatches-opened]=\"opened\">\n      <span *ngFor=\"let skinTone of skinTones\"\n        class=\"emoji-mart-skin-swatch\"\n        [class.emoji-mart-skin-swatch-selected]=\"skinTone === skin\"\n        >\n          <span (click)=\"this.handleClick(skinTone)\"\n            class=\"emoji-mart-skin emoji-mart-skin-tone-{{ skinTone }}\"\n          ></span>\n        </span>\n    </div>\n  </div>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
SkinComponent.ctorParameters = function () { return []; };
SkinComponent.propDecorators = {
    "skin": [{ type: Input },],
    "change": [{ type: Output },],
};
var components = [
    PickerComponent,
    AnchorsComponent,
    CategoryComponent,
    SearchComponent,
    PreviewComponent,
    SkinComponent,
];
var PickerModule = /** @class */ (function () {
    function PickerModule() {
    }
    return PickerModule;
}());
PickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, EmojiModule],
                exports: components,
                declarations: components,
                providers: [EmojiSearch, EmojiFrequentlyService],
            },] },
];
PickerModule.ctorParameters = function () { return []; };

export { AnchorsComponent, CategoryComponent, EmojiFrequentlyService, EmojiSearch, PickerComponent, PickerModule, PreviewComponent, SearchComponent, SkinComponent };
//# sourceMappingURL=ctrl-ngx-emoji-mart.js.map
