import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Injectable, ChangeDetectorRef, ViewChild, ViewChildren, NgModule } from '@angular/core';
import { categories } from '@ctrl/ngx-emoji-mart/ngx-emoji/data/categories';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji/emoji.service';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji/emoji.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/* tslint:disable max-line-length */
const svgs = {
    activity: `M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24m10 11h-5c.3-2.5 1.3-4.8 2-6.1a10 10 0 0 1 3 6.1m-9 0V2a10 10 0 0 1 4.4 1.6A18 18 0 0 0 15 11h-2zm-2 0H9a18 18 0 0 0-2.4-7.4A10 10 0 0 1 11 2.1V11zm0 2v9a10 10 0 0 1-4.4-1.6A18 18 0 0 0 9 13h2zm4 0a18 18 0 0 0 2.4 7.4 10 10 0 0 1-4.4 1.5V13h2zM5 4.9c.7 1.3 1.7 3.6 2 6.1H2a10 10 0 0 1 3-6.1M2 13h5c-.3 2.5-1.3 4.8-2 6.1A10 10 0 0 1 2 13m17 6.1c-.7-1.3-1.7-3.6-2-6.1h5a10 10 0 0 1-3 6.1`,
    custom: `M10 1h3v21h-3zm10.186 4l1.5 2.598L3.5 18.098 2 15.5zM2 7.598L3.5 5l18.186 10.5-1.5 2.598z`,
    flags: `M0 0l6 24h2L2 0zm21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.6 3h7.8l2 8H8.6l-2-8zm8.8 10l-2.9 1.9-.4-1.9h3.3zm3.6 0l-1.5-6h2l2 8H16l3-2z`,
    foods: `M17 5c-1.8 0-2.9.4-3.7 1 .5-1.3 1.8-3 4.7-3a1 1 0 0 0 0-2c-3 0-4.6 1.3-5.5 2.5l-.2.2c-.6-1.9-1.5-3.7-3-3.7C8.5 0 7.7.3 7 1c-2 1.5-1.7 2.9-.5 4C3.6 5.2 0 7.4 0 13c0 4.6 5 11 9 11 2 0 2.4-.5 3-1 .6.5 1 1 3 1 4 0 9-6.4 9-11 0-6-4-8-7-8M8.2 2.5c.7-.5 1-.5 1-.5.4.2 1 1.4 1.4 3-1.6-.6-2.8-1.3-3-1.8l.6-.7M15 22c-1 0-1.2-.1-1.6-.4l-.1-.2a2 2 0 0 0-2.6 0l-.1.2c-.4.3-.5.4-1.6.4-2.8 0-7-5.4-7-9 0-6 4.5-6 5-6 2 0 2.5.4 3.4 1.2l.3.3a2 2 0 0 0 2.6 0l.3-.3c1-.8 1.5-1.2 3.4-1.2.5 0 5 .1 5 6 0 3.6-4.2 9-7 9`,
    nature: `M15.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m10.43-8h-.02c-.97 0-2.14.79-3.02 1.5A13.88 13.88 0 0 0 12 .99c-1.28 0-2.62.13-3.87.51C7.24.8 6.07 0 5.09 0h-.02C3.35 0 .07 2.67 0 7.03c-.04 2.47.28 4.23 1.04 5 .26.27.88.69 1.3.9.19 3.17.92 5.23 2.53 6.37.9.64 2.19.95 3.2 1.1-.03.2-.07.4-.07.6 0 1.77 2.35 3 4 3s4-1.23 4-3c0-.2-.04-.4-.07-.59 2.57-.38 5.43-1.87 5.92-7.58.4-.22.89-.57 1.1-.8.77-.76 1.09-2.52 1.05-5C23.93 2.67 20.65 0 18.93 0M3.23 9.13c-.24.29-.84 1.16-.9 1.24A9.67 9.67 0 0 1 2 7.08c.05-3.28 2.48-4.97 3.1-5.03.25.02.72.27 1.26.65A7.95 7.95 0 0 0 4 7.82c-.14.55-.4.86-.79 1.31M12 22c-.9 0-1.95-.7-2-1 0-.65.47-1.24 1-1.6v.6a1 1 0 1 0 2 0v-.6c.52.36 1 .95 1 1.6-.05.3-1.1 1-2 1m3-3.48v.02a4.75 4.75 0 0 0-1.26-1.02c1.09-.52 2.24-1.33 2.24-2.22 0-1.84-1.78-2.2-3.98-2.2s-3.98.36-3.98 2.2c0 .89 1.15 1.7 2.24 2.22A4.8 4.8 0 0 0 9 18.54v-.03a6.1 6.1 0 0 1-2.97-.84c-1.3-.92-1.84-3.04-1.86-6.48l.03-.04c.5-.82 1.49-1.45 1.8-3.1C6 6 7.36 4.42 8.36 3.53c1.01-.35 2.2-.53 3.59-.53 1.45 0 2.68.2 3.73.57 1 .9 2.32 2.46 2.32 4.48.31 1.65 1.3 2.27 1.8 3.1l.1.18c-.06 5.97-1.95 7.01-4.9 7.19m6.63-8.2l-.11-.2a7.59 7.59 0 0 0-.74-.98 3.02 3.02 0 0 1-.79-1.32 7.93 7.93 0 0 0-2.35-5.12c.53-.38 1-.63 1.26-.65.64.07 3.05 1.77 3.1 5.03.02 1.81-.35 3.22-.37 3.24`,
    objects: `M12 0a9 9 0 0 0-5 16.5V21s2 3 5 3 5-3 5-3v-4.5A9 9 0 0 0 12 0zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM9 17.5a9 9 0 0 0 6 0v.8a7 7 0 0 1-3 .7 7 7 0 0 1-3-.7v-.8zm.2 3a8.9 8.9 0 0 0 2.8.5c1 0 1.9-.2 2.8-.5-.6.7-1.6 1.5-2.8 1.5-1.1 0-2.1-.8-2.8-1.5zm5.5-8.1c-.8 0-1.1-.8-1.5-1.8-.5-1-.7-1.5-1.2-1.5s-.8.5-1.3 1.5c-.4 1-.8 1.8-1.6 1.8h-.3c-.5-.2-.8-.7-1.3-1.8l-.2-1A3 3 0 0 0 7 9a1 1 0 0 1 0-2c1.7 0 2 1.4 2.2 2.1.5-1 1.3-2 2.8-2 1.5 0 2.3 1.1 2.7 2.1.2-.8.6-2.2 2.3-2.2a1 1 0 1 1 0 2c-.2 0-.3.5-.3.7a6.5 6.5 0 0 1-.3 1c-.5 1-.8 1.7-1.7 1.7`,
    people: `M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24m0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20M8 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4m8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-.8 8c-.7 1.2-1.8 2-3.3 2-1.5 0-2.7-.8-3.4-2H15m3-2H6a6 6 0 1 0 12 0`,
    places: `M6.5 12a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5m11-3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5m5-5.5l-1-.4-.1-.1h.6c.6 0 1-.4 1-1 0-1-.9-2-2-2h-.6l-.8-1.7A3 3 0 0 0 16.8 2H7.2a3 3 0 0 0-2.8 2.3L3.6 6H3a2 2 0 0 0-2 2c0 .6.4 1 1 1h.6v.1l-1 .4a2 2 0 0 0-1.4 2l.7 7.6a1 1 0 0 0 1 .9H3v1c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-1h6v1c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-1h1.1a1 1 0 0 0 1-.9l.7-7.5a2 2 0 0 0-1.3-2.1M6.3 4.9c.1-.5.5-.9 1-.9h9.5c.4 0 .8.4 1 .9L19.2 9H4.7l1.6-4.1zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.2-3H2.8l-.7-6.6.9-.4h18l.9.4-.7 6.6z`,
    recent: `M13 4h-2v7H9v2h2v2h2v-2h4v-2h-4zm-1-4a12 12 0 1 0 0 24 12 12 0 0 0 0-24m0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20`,
    symbols: `M0 0h11v2H0zm4 11h3V6h4V4H0v2h4zm11.5 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-2.99a.5.5 0 0 1 0 .99c-.28 0-.5-.22-.5-.5s.22-.49.5-.49m6 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 2.99a.5.5 0 0 1-.5-.5.5.5 0 0 1 1 .01.5.5 0 0 1-.5.49m.5-9l-9 9 1.51 1.5 9-9zm-5-2c2.2 0 4-1.12 4-2.5V2s.98-.16 1.5.95C23 4.05 23 6 23 6s1-1.12 1-3.13C24-.02 21 0 21 0h-2v6.35A5.85 5.85 0 0 0 17 6c-2.2 0-4 1.12-4 2.5s1.8 2.5 4 2.5m-6.7 9.48L8.82 18.9a47.54 47.54 0 0 1-1.44 1.13c-.3-.3-.99-1.02-2.04-2.19.9-.83 1.47-1.46 1.72-1.89s.38-.87.38-1.33c0-.6-.27-1.18-.82-1.76-.54-.58-1.33-.87-2.35-.87-1 0-1.79.29-2.34.87-.56.6-.83 1.18-.83 1.79 0 .81.42 1.75 1.25 2.8a6.57 6.57 0 0 0-1.8 1.79 3.46 3.46 0 0 0-.51 1.83c0 .86.3 1.56.92 2.1a3.5 3.5 0 0 0 2.42.83c1.17 0 2.44-.38 3.81-1.14L8.23 24h2.82l-2.09-2.38 1.34-1.14zM3.56 14.1a1.02 1.02 0 0 1 .73-.28c.31 0 .56.08.75.25a.85.85 0 0 1 .28.66c0 .52-.42 1.11-1.26 1.78-.53-.65-.8-1.23-.8-1.74a.9.9 0 0 1 .3-.67m.18 7.9c-.43 0-.78-.12-1.06-.35-.28-.23-.41-.49-.41-.76 0-.6.5-1.3 1.52-2.09a31.23 31.23 0 0 0 2.25 2.44c-.92.5-1.69.76-2.3.76`,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AnchorsComponent {
    constructor() {
        this.categories = [];
        this.anchorClick = new EventEmitter();
        this.svgs = svgs;
    }
    /**
     * @param {?} $event
     * @param {?} index
     * @return {?}
     */
    handleClick($event, index) {
        this.anchorClick.emit({
            category: this.categories[index],
            index,
        });
    }
}
AnchorsComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-mart-anchors',
                template: `
  <div class="emoji-mart-anchors">
    <ng-container *ngFor="let category of categories; let idx = index">
      <span
        *ngIf="category.anchor !== false"
        title="i18n.categories[category.id]"
        (click)="this.handleClick($event, idx)"
        class="emoji-mart-anchor"
        [class.emoji-mart-anchor-selected]="category.name === selected"
        [style.color]="category.name === selected ? color : null"
      >
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path [attr.d]="svgs[category.id]" />
          </svg>
        </div>
        <span
          class="emoji-mart-anchor-bar"
          [style.background-color]="color"
        ></span>
      </span>
    </ng-container>
  </div>
  `,
                styles: [],
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
AnchorsComponent.ctorParameters = () => [];
AnchorsComponent.propDecorators = {
    "categories": [{ type: Input },],
    "color": [{ type: Input },],
    "selected": [{ type: Input },],
    "anchorClick": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class EmojiFrequentlyService {
    constructor() {
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
    /**
     * @return {?}
     */
    init() {
        this.frequently = JSON.parse(localStorage.getItem(`${this.NAMESPACE}.frequently`) || 'null');
        this.initialized = true;
    }
    /**
     * @param {?} emoji
     * @return {?}
     */
    add(emoji) {
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
        localStorage.setItem(`${this.NAMESPACE}.last`, emoji.id);
        localStorage.setItem(`${this.NAMESPACE}.frequently`, JSON.stringify(this.frequently));
    }
    /**
     * @param {?} perLine
     * @return {?}
     */
    get(perLine) {
        if (!this.initialized) {
            this.init();
        }
        if (this.frequently === null) {
            this.defaults = {};
            const /** @type {?} */ result = [];
            for (let /** @type {?} */ i = 0; i < perLine; i++) {
                this.defaults[this.DEFAULTS[i]] = perLine - i;
                result.push(this.DEFAULTS[i]);
            }
            return result;
        }
        const /** @type {?} */ quantity = perLine * 4;
        const /** @type {?} */ frequentlyKeys = Object.keys(this.frequently);
        const /** @type {?} */ sorted = frequentlyKeys
            .sort((a, b) => /** @type {?} */ ((this.frequently))[a] - /** @type {?} */ ((this.frequently))[b])
            .reverse();
        const /** @type {?} */ sliced = sorted.slice(0, quantity);
        const /** @type {?} */ last = localStorage.getItem(`${this.NAMESPACE}.last`);
        if (last && sliced.indexOf(last) === -1) {
            sliced.pop();
            sliced.push(last);
        }
        return sliced;
    }
}
EmojiFrequentlyService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EmojiFrequentlyService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CategoryComponent {
    /**
     * @param {?} ref
     * @param {?} emojiService
     * @param {?} frequently
     */
    constructor(ref, emojiService, frequently) {
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
    /**
     * @return {?}
     */
    ngOnInit() {
        this.emojis = this.getEmojis();
        if (!this.emojis) {
            this.containerStyles = { display: 'none' };
        }
        if (!this.hasStickyPosition) {
            this.labelStyles = { height: 28 };
            this.labelSpanStyles = { position: 'absolute' };
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.parent = /** @type {?} */ ((this.container)).nativeElement.parentNode.parentNode;
        this.memoizeSize();
    }
    /**
     * @return {?}
     */
    memoizeSize() {
        const { top, height, } = /** @type {?} */ ((this.container)).nativeElement.getBoundingClientRect();
        const /** @type {?} */ parentTop = /** @type {?} */ ((this.parent)).getBoundingClientRect().top;
        const /** @type {?} */ labelHeight = /** @type {?} */ ((this.label)).nativeElement.getBoundingClientRect().height;
        this.top = top - parentTop + /** @type {?} */ ((this.parent)).scrollTop;
        if (height === 0) {
            this.maxMargin = 0;
        }
        else {
            this.maxMargin = height - labelHeight;
        }
    }
    /**
     * @param {?} scrollTop
     * @return {?}
     */
    handleScroll(scrollTop) {
        let /** @type {?} */ margin = scrollTop - this.top;
        margin = margin < this.minMargin ? this.minMargin : margin;
        margin = margin > this.maxMargin ? this.maxMargin : margin;
        if (margin === this.margin) {
            return;
        }
        if (!this.hasStickyPosition) {
            /** @type {?} */ ((this.label)).nativeElement.style.top = `${margin}px`;
        }
        this.margin = margin;
        return true;
    }
    /**
     * @return {?}
     */
    getEmojis() {
        if (this.name === 'Recent') {
            let /** @type {?} */ frequentlyUsed = this.recent || this.frequently.get(this.perLine);
            if (!frequentlyUsed || !frequentlyUsed.length) {
                frequentlyUsed = this.frequently.get(this.perLine);
            }
            if (frequentlyUsed.length) {
                this.emojis = frequentlyUsed
                    .map(id => {
                    const /** @type {?} */ emoji = this.custom.filter((e) => e.id === id)[0];
                    if (emoji) {
                        return emoji;
                    }
                    return id;
                })
                    .filter(id => !!this.emojiService.getData(id));
            }
            if ((!this.emojis || this.emojis.length === 0) && frequentlyUsed.length > 0) {
                return null;
            }
        }
        if (this.emojis) {
            this.emojis = this.emojis.slice(0);
        }
        return this.emojis;
    }
    /**
     * @param {?} display
     * @return {?}
     */
    updateDisplay(display) {
        this.containerStyles.display = display;
        this.ref.detectChanges();
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackById(index, item) {
        return item;
    }
}
CategoryComponent.decorators = [
    { type: Component, args: [{
                selector: '[emoji-category]',
                template: `
  <div
    #container
    class="emoji-mart-category"
    [class.emoji-mart-no-results]="emojis && !emojis.length"
    [ngStyle]="containerStyles"
  >
    <div
      [ngStyle]="labelStyles"
      [attr.data-name]="name"
      class="emoji-mart-category-label"
    >
      <span style="labelSpanStyles" #label>
        {{ i18n.categories[id] }}
      </span>
    </div>
    <ng-template [ngIf]="emojis">
      <ngx-emoji
        *ngFor="let emoji of emojis; trackBy: trackById"
        [emoji]="emoji"
        [size]="emojiSize"
        [skin]="emojiSkin"
        [native]="emojiNative"
        [set]="emojiSet"
        [sheetSize]="emojiSheetSize"
        [forceSize]="emojiForceSize"
        [tooltip]="emojiTooltip"
        [hideObsolete]="hideObsolete"
        (emojiOver)="emojiOver.emit($event)"
        (emojiLeave)="emojiLeave.emit($event)"
        (emojiClick)="emojiClick.emit($event)"
      >
      </ngx-emoji>
    </ng-template>
    <div *ngIf="emojis && !emojis.length">
      <div>
        <ngx-emoji
          emoji="sleuth_or_spy"
          size="38"
          [skin]="emojiSkin"
          [native]="emojiNative"
          [set]="emojiSet"
          [sheetSize]="emojiSheetSize"
          [forceSize]="emojiForceSize"
          [tooltip]="emojiTooltip"
          >
        </ngx-emoji>
      </div>
      <div className="emoji-mart-no-results-label">
        {{ i18n.notfound }}
      </div>
    </div>
  </div>
  `,
                styles: [],
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
CategoryComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: EmojiService, },
    { type: EmojiFrequentlyService, },
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} arr
 * @return {?}
 */
function uniq(arr) {
    return arr.reduce((acc, item) => {
        if (acc.indexOf(item) === -1) {
            acc.push(item);
        }
        return acc;
    }, []);
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function intersect(a, b) {
    const /** @type {?} */ uniqA = uniq(a);
    const /** @type {?} */ uniqB = uniq(b);
    return uniqA.filter((item) => uniqB.indexOf(item) >= 0);
}
/**
 * @return {?}
 */
function measureScrollbar() {
    if (typeof document === 'undefined') {
        return 0;
    }
    const /** @type {?} */ div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    document.body.appendChild(div);
    const /** @type {?} */ scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class EmojiSearch {
    /**
     * @param {?} emojiService
     */
    constructor(emojiService) {
        this.emojiService = emojiService;
        this.originalPool = {};
        this.index = {};
        this.emojisList = {};
        this.emoticonsList = {};
        this.emojiSearch = {};
        for (const /** @type {?} */ emojiData of this.emojiService.emojis) {
            const { short_names, emoticons } = emojiData;
            const /** @type {?} */ id = short_names[0];
            emoticons.forEach(emoticon => {
                if (this.emoticonsList[emoticon]) {
                    return;
                }
                this.emoticonsList[emoticon] = id;
            });
            this.emojisList[id] = this.emojiService.getSanitizedData(id);
            this.originalPool[id] = emojiData;
        }
    }
    /**
     * @param {?} custom
     * @param {?} pool
     * @return {?}
     */
    addCustomToPool(custom, pool) {
        custom.forEach((emoji) => {
            const /** @type {?} */ emojiId = emoji.id || emoji.short_names[0];
            if (emojiId && !pool[emojiId]) {
                pool[emojiId] = this.emojiService.getData(emoji);
                this.emojisList[emojiId] = this.emojiService.getSanitizedData(emoji);
            }
        });
    }
    /**
     * @param {?} value
     * @param {?=} emojisToShowFilter
     * @param {?=} maxResults
     * @param {?=} include
     * @param {?=} exclude
     * @param {?=} custom
     * @return {?}
     */
    search(value, emojisToShowFilter, maxResults = 75, include = [], exclude = [], custom = []) {
        this.addCustomToPool(custom, this.originalPool);
        let /** @type {?} */ results;
        let /** @type {?} */ pool = this.originalPool;
        if (value.length) {
            if (value === '-' || value === '-1') {
                return [this.emojisList['-1']];
            }
            let /** @type {?} */ values = value.toLowerCase().split(/[\s|,|\-|_]+/);
            let /** @type {?} */ allResults = [];
            if (values.length > 2) {
                values = [values[0], values[1]];
            }
            if (include.length || exclude.length) {
                pool = {};
                categories.forEach(category => {
                    const /** @type {?} */ isIncluded = include && include.length
                        ? include.indexOf(category.id) > -1
                        : true;
                    const /** @type {?} */ isExcluded = exclude && exclude.length
                        ? exclude.indexOf(category.id) > -1
                        : false;
                    if (!isIncluded || isExcluded) {
                        return;
                    }
                    category.emojis.forEach(emojiId => pool[emojiId] = this.emojiService.names[emojiId]);
                });
                if (custom.length) {
                    const /** @type {?} */ customIsIncluded = include && include.length ? include.indexOf('custom') > -1 : true;
                    const /** @type {?} */ customIsExcluded = exclude && exclude.length ? exclude.indexOf('custom') > -1 : false;
                    if (customIsIncluded && !customIsExcluded) {
                        this.addCustomToPool(custom, pool);
                    }
                }
            }
            allResults = values
                .map(v => {
                let /** @type {?} */ aPool = pool;
                let /** @type {?} */ aIndex = this.index;
                let /** @type {?} */ length = 0;
                for (let /** @type {?} */ charIndex = 0; charIndex < v.length; charIndex++) {
                    const /** @type {?} */ char = v[charIndex];
                    length++;
                    if (!aIndex[char]) {
                        aIndex[char] = {};
                    }
                    aIndex = aIndex[char];
                    if (!aIndex.results) {
                        const /** @type {?} */ scores = {};
                        aIndex.results = [];
                        aIndex.pool = {};
                        for (const /** @type {?} */ id of Object.keys(aPool)) {
                            const /** @type {?} */ emoji = aPool[id];
                            if (!this.emojiSearch[id]) {
                                this.emojiSearch[id] = this.buildSearch(emoji.short_names, emoji.name, emoji.keywords, emoji.emoticons);
                            }
                            const /** @type {?} */ query = this.emojiSearch[id];
                            const /** @type {?} */ sub = v.substr(0, length);
                            const /** @type {?} */ subIndex = query.indexOf(sub);
                            if (subIndex !== -1) {
                                let /** @type {?} */ score = subIndex + 1;
                                if (sub === id) {
                                    score = 0;
                                }
                                aIndex.results.push(this.emojisList[id]);
                                aIndex.pool[id] = emoji;
                                scores[id] = score;
                            }
                        }
                        aIndex.results.sort((a, b) => {
                            const /** @type {?} */ aScore = scores[a.id];
                            const /** @type {?} */ bScore = scores[b.id];
                            return aScore - bScore;
                        });
                    }
                    aPool = aIndex.pool;
                }
                return aIndex.results;
            })
                .filter(a => a);
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
                results = results.filter((result) => emojisToShowFilter(this.emojiService.names[result.id]));
            }
            if (results && results.length > maxResults) {
                results = results.slice(0, maxResults);
            }
        }
        return results || null;
    }
    /**
     * @param {?} short_names
     * @param {?} name
     * @param {?} keywords
     * @param {?} emoticons
     * @return {?}
     */
    buildSearch(short_names, name, keywords, emoticons) {
        const /** @type {?} */ search = [];
        const /** @type {?} */ addToSearch = (strings, split) => {
            if (!strings) {
                return;
            }
            (Array.isArray(strings) ? strings : [strings]).forEach(string => {
                (split ? string.split(/[-|_|\s]+/) : [string]).forEach(s => {
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
    }
}
EmojiSearch.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EmojiSearch.ctorParameters = () => [
    { type: EmojiService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PreviewComponent {
    /**
     * @param {?} ref
     * @param {?} emojiService
     */
    constructor(ref, emojiService) {
        this.ref = ref;
        this.emojiService = emojiService;
        this.skinChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!this.emoji) {
            return;
        }
        this.emojiData = this.emojiService.getData(this.emoji);
        const /** @type {?} */ knownEmoticons = [];
        const /** @type {?} */ listedEmoticons = [];
        const /** @type {?} */ emoitcons = this.emojiData.emoticons || [];
        emoitcons.forEach((emoticon) => {
            if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
                return;
            }
            knownEmoticons.push(emoticon.toLowerCase());
            listedEmoticons.push(emoticon);
        });
        this.listedEmoticons = listedEmoticons;
    }
}
PreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-preview',
                template: `
  <div class="emoji-mart-preview" *ngIf="emoji">
    <div class="emoji-mart-preview-emoji">
      <ngx-emoji [emoji]="emoji" [size]="38"
        [native]="emojiNative"
        [size]="emojiSize"
        [skin]="emojiSkin"
        [set]="emojiSet"
        [sheetSize]="emojiSheetSize"
        [backgroundImageFn]="emojiBackgroundImageFn"
      >
      </ngx-emoji>
    </div>
    <div class="emoji-mart-preview-data">
      <div class="emoji-mart-preview-name">{{ emojiData.name }}</div>
      <div class="emoji-mart-preview-shortnames">
        <span class="emoji-mart-preview-shortname" *ngFor="let short_name of emojiData.short_names">
          :{{ short_name }}:
        </span>
      </div>
      <div class="emoji-mart-preview-emoticons">
        <span class="emoji-mart-preview-emoticon" *ngFor="let emoticon of listedEmoticons">
          {{ emoticon }}
        </span>
      </div>
    </div>
  </div>
  <div class="emoji-mart-preview" *ngIf="!emoji">
    <div class="emoji-mart-preview-emoji">
      <ngx-emoji *ngIf="idleEmoji && idleEmoji.length"
        [native]="emojiNative"
        [skin]="emojiSkin"
        [set]="emojiSet"
        [emoji]="idleEmoji"
        [backgroundImageFn]="emojiBackgroundImageFn"
        [size]="38">
      </ngx-emoji>
    </div>
    <div class="emoji-mart-preview-data">
      <span class="emoji-mart-title-label">{{ title }}</span>
    </div>
    <div class="emoji-mart-preview-skins">
      <emoji-skins [skin]="emojiSkin" (change)="skinChange.emit($event)">
      </emoji-skins>
    </div>
  </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
PreviewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: EmojiService, },
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const RECENT_CATEGORY = {
    id: 'recent',
    name: 'Recent',
    emojis: null,
};
const SEARCH_CATEGORY = {
    id: 'search',
    name: 'Search',
    emojis: null,
    anchor: false,
};
const CUSTOM_CATEGORY = {
    id: 'custom',
    name: 'Custom',
    emojis: (/** @type {?} */ ([])),
};
const I18N = {
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
class PickerComponent {
    /**
     * @param {?} frequently
     */
    constructor(frequently) {
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
        this.backgroundImageFn = (set, sheetSize) => `https://unpkg.com/emoji-datasource-${this.set}@4.0.3/img/${this.set}/sheets-256/${this.sheetSize}.png`;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // measure scroll
        this.measureScrollbar = measureScrollbar();
        this.i18n = Object.assign({}, I18N, this.i18n);
        this.i18n.categories = Object.assign({}, I18N.categories, this.i18n.categories);
        this.skin = JSON.parse(localStorage.getItem(`${this.NAMESPACE}.skin`) || 'null') || this.skin;
        const /** @type {?} */ allCategories = [...categories];
        if (this.custom.length > 0) {
            CUSTOM_CATEGORY.emojis = this.custom.map(emoji => {
                return Object.assign({}, emoji, { id: emoji.short_names[0], custom: true });
            });
            allCategories.push(CUSTOM_CATEGORY);
        }
        if (this.include !== undefined) {
            allCategories.sort((a, b) => {
                if (this.include.indexOf(a.id) > this.include.indexOf(b.id)) {
                    return 1;
                }
                return 0;
            });
        }
        for (let /** @type {?} */ categoryIndex = 0; categoryIndex < allCategories.length; categoryIndex++) {
            const /** @type {?} */ category = allCategories[categoryIndex];
            const /** @type {?} */ isIncluded = this.include && this.include.length
                ? this.include.indexOf(category.id) > -1
                : true;
            const /** @type {?} */ isExcluded = this.exclude && this.exclude.length
                ? this.exclude.indexOf(category.id) > -1
                : false;
            if (!isIncluded || isExcluded) {
                continue;
            }
            if (this.emojisToShowFilter) {
                const /** @type {?} */ newEmojis = [];
                const { emojis } = category;
                for (let /** @type {?} */ emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
                    const /** @type {?} */ emoji = emojis[emojiIndex];
                    if (this.emojisToShowFilter(emoji)) {
                        newEmojis.push(emoji);
                    }
                }
                if (newEmojis.length) {
                    const /** @type {?} */ newCategory = {
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
        const /** @type {?} */ includeRecent = this.include && this.include.length
            ? this.include.indexOf(RECENT_CATEGORY.id) > -1
            : true;
        const /** @type {?} */ excludeRecent = this.exclude && this.exclude.length
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
        this.selected = this.categories.filter(category => category.first)[0].name;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.updateCategoriesSize();
    }
    /**
     * @return {?}
     */
    updateCategoriesSize() {
        /** @type {?} */ ((this.categoryRefs)).forEach((component) => component.memoizeSize());
        if (this.scrollRef) {
            const /** @type {?} */ target = this.scrollRef.nativeElement;
            this.scrollHeight = target.scrollHeight;
            this.clientHeight = target.clientHeight;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleAnchorClick($event) {
        const /** @type {?} */ component = /** @type {?} */ ((this.categoryRefs)).find((n) => n.id === $event.category.id);
        let /** @type {?} */ scrollToComponent = null;
        scrollToComponent = () => {
            if (component) {
                let { top } = component;
                if ($event.category.first) {
                    top = 0;
                }
                else {
                    top += 1;
                } /** @type {?} */
                ((this.scrollRef)).nativeElement.scrollTop = top;
            }
        };
        if (SEARCH_CATEGORY.emojis) {
            // this.handleSearch(null);
            // this.search.clear();
            window.requestAnimationFrame(scrollToComponent);
        }
        else {
            scrollToComponent();
        }
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    categoryTrack(index, item) {
        return item.id;
    }
    /**
     * @return {?}
     */
    handleScroll() {
        if (!this.scrollRef) {
            return;
        }
        let /** @type {?} */ activeCategory = null;
        let /** @type {?} */ scrollTop;
        if (SEARCH_CATEGORY.emojis) {
            activeCategory = SEARCH_CATEGORY;
        }
        else {
            const /** @type {?} */ target = this.scrollRef.nativeElement;
            scrollTop = target.scrollTop;
            const /** @type {?} */ scrollingDown = scrollTop > (this.scrollTop || 0);
            let /** @type {?} */ minTop = 0;
            for (let /** @type {?} */ i = 0, /** @type {?} */ l = this.categories.length; i < l; i++) {
                const /** @type {?} */ ii = scrollingDown ? this.categories.length - 1 - i : i;
                const /** @type {?} */ category = this.categories[ii];
                const /** @type {?} */ component = /** @type {?} */ ((this.categoryRefs)).find((n) => n.id === category.id);
                if (component) {
                    const /** @type {?} */ active = component.handleScroll(scrollTop);
                    if (!minTop || component.top < minTop) {
                        if (component.top > 0) {
                            minTop = component.top;
                        }
                    }
                    if (active && !activeCategory) {
                        activeCategory = category;
                    }
                }
            }
            if (scrollTop < minTop) {
                activeCategory = this.categories.filter(category => !(category.anchor === false))[0];
            }
            else if (scrollTop + this.clientHeight >= this.scrollHeight) {
                activeCategory = this.categories[this.categories.length - 1];
            }
        }
        if (activeCategory) {
            const { name: categoryName } = activeCategory;
            if (this.selected !== categoryName) {
                this.selected = categoryName;
            }
        }
        this.scrollTop = scrollTop;
    }
    /**
     * @param {?} $emojis
     * @return {?}
     */
    handleSearch($emojis) {
        SEARCH_CATEGORY.emojis = $emojis;
        for (const /** @type {?} */ component of /** @type {?} */ ((this.categoryRefs)).toArray()) {
            if (component.name === 'Search') {
                component.emojis = $emojis;
                component.updateDisplay($emojis ? 'inherit' : 'none');
            }
            else {
                component.updateDisplay($emojis ? 'none' : 'inherit');
            }
        } /** @type {?} */
        ((
        // this.forceUpdate();
        this.scrollRef)).nativeElement.scrollTop = 0;
        this.handleScroll();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleEmojiOver($event) {
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        const /** @type {?} */ emojiData = CUSTOM_CATEGORY.emojis.find(customEmoji => customEmoji.id === $event.emoji.id);
        if (emojiData) {
            $event.emoji = Object.assign({}, emojiData);
        }
        this.previewEmoji = $event.emoji;
        clearTimeout(this.leaveTimeout);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleEmojiLeave($event) {
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        this.leaveTimeout = setTimeout(() => {
            this.previewEmoji = null; /** @type {?} */
            ((this.previewRef)).ref.markForCheck();
        }, 16);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleEmojiClick($event) {
        this.emojiClick.emit($event);
        if (!this.hideRecent && !this.recent) {
            this.frequently.add($event.emoji);
        }
        const /** @type {?} */ component = /** @type {?} */ ((this.categoryRefs)).toArray()[1];
        if (component) {
            const /** @type {?} */ maxMargin = component.maxMargin;
            component.emojis = this.frequently.get(maxMargin);
            component.ref.markForCheck();
            window.requestAnimationFrame(() => {
                if (!this.scrollRef) {
                    return;
                }
                component.memoizeSize();
                if (maxMargin === component.maxMargin) {
                    return;
                }
                this.updateCategoriesSize();
                this.handleScroll();
                if (SEARCH_CATEGORY.emojis) {
                    component.updateDisplay('none');
                }
            });
        }
    }
    /**
     * @param {?} skin
     * @return {?}
     */
    handleSkinChange(skin) {
        this.skin = skin;
        localStorage.setItem(`${this.NAMESPACE}.skin`, String(skin));
    }
}
PickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-mart',
                template: `<div
  [style.width.px]="perLine * (emojiSize + 12) + 12 + 2 + measureScrollbar"
  [ngStyle]="style"
  class="emoji-mart">
  <div class="emoji-mart-bar">
    <emoji-mart-anchors
      [categories]="categories"
      (anchorClick)="handleAnchorClick($event)"
      [color]="color"
      [selected]="selected"
    >
    </emoji-mart-anchors>
  </div>
  <emoji-search
    [i18n]="i18n"
    (search)="handleSearch($event)"
    [include]="include"
    [exclude]="exclude"
    [custom]="custom"
    [autoFocus]="autoFocus"
    [emojisToShowFilter]="emojisToShowFilter"
  >
  </emoji-search>
  <div
    #scrollRef
    class="emoji-mart-scroll"
    (scroll)="handleScroll()"
  >
    <div emoji-category
      *ngFor="let category of categories; let idx = index; trackBy: categoryTrack"
      #categoryRef
      [id]="category.id"
      [name]="category.name"
      [emojis]="category.emojis"
      [perLine]="perLine"
      [native]="native"
      [hasStickyPosition]="native"
      [i18n]="i18n"
      [hideObsolete]="hideObsolete"
      [custom]="category.id == RECENT_CATEGORY.id ? CUSTOM_CATEGORY.emojis : undefined"
      [recent]="category.id == RECENT_CATEGORY.id ? recent : undefined"
      [emojiNative]="native"
      [emojiSkin]="skin"
      [emojiSize]="emojiSize"
      [emojiSet]="set"
      [emojiSheetSize]="sheetSize"
      [emojiForceSize]="native"
      [emojiTooltip]="emojiTooltip"
      (emojiOver)="handleEmojiOver($event)"
      (emojiLeave)="handleEmojiLeave($event)"
      (emojiClick)="handleEmojiClick($event)"
    >
    </div>
</div>
<div class="emoji-mart-bar" *ngIf="showPreview">
  <emoji-preview
    #previewRef
    [title]="title"
    [emoji]="previewEmoji"
    [idleEmoji]="emoji"
    [emojiNative]="native"
    [emojiSize]="38"
    [emojiSkin]="skin"
    [emojiSet]="set"
    [emojiSheetSize]="sheetSize"
    [emojiBackgroundImageFn]="backgroundImageFn"
    (skinChange)="handleSkinChange($event)"
  ></emoji-preview>
</div>
`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
PickerComponent.ctorParameters = () => [
    { type: EmojiFrequentlyService, },
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchComponent {
    /**
     * @param {?} emojiSearch
     */
    constructor(emojiSearch) {
        this.emojiSearch = emojiSearch;
        this.maxResults = 75;
        this.autoFocus = false;
        this.include = [];
        this.exclude = [];
        this.custom = [];
        this.search = new EventEmitter();
        this.query = '';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.autoFocus && this.inputRef) {
            this.inputRef.nativeElement.focus();
        }
    }
    /**
     * @return {?}
     */
    handleChange() {
        this.search.emit(this.emojiSearch.search(this.query, this.emojisToShowFilter, this.maxResults, this.include, this.exclude, this.custom));
    }
}
SearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-search',
                template: `
  <div class="emoji-mart-search">
    <input #inputRef type="text"
      [placeholder]="i18n.search" [autofocus]="autoFocus"
      [(ngModel)]="query" (ngModelChange)="handleChange()"
    />
  </div>
  `,
                styles: [],
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
SearchComponent.ctorParameters = () => [
    { type: EmojiSearch, },
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SkinComponent {
    constructor() {
        this.change = new EventEmitter();
        this.opened = false;
        this.skinTones = [1, 2, 3, 4, 5, 6];
    }
    /**
     * @return {?}
     */
    toggleOpen() {
        this.opened = !this.opened;
    }
    /**
     * @param {?} skin
     * @return {?}
     */
    handleClick(skin) {
        if (!this.opened) {
            this.opened = true;
            return;
        }
        this.opened = false;
        if (skin !== this.skin) {
            this.change.emit(skin);
        }
    }
}
SkinComponent.decorators = [
    { type: Component, args: [{
                selector: 'emoji-skins',
                template: `
  <div>
    <div class="emoji-mart-skin-swatches" [class.emoji-mart-skin-swatches-opened]="opened">
      <span *ngFor="let skinTone of skinTones"
        class="emoji-mart-skin-swatch"
        [class.emoji-mart-skin-swatch-selected]="skinTone === skin"
        >
          <span (click)="this.handleClick(skinTone)"
            class="emoji-mart-skin emoji-mart-skin-tone-{{ skinTone }}"
          ></span>
        </span>
    </div>
  </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
SkinComponent.ctorParameters = () => [];
SkinComponent.propDecorators = {
    "skin": [{ type: Input },],
    "change": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const components = [
    PickerComponent,
    AnchorsComponent,
    CategoryComponent,
    SearchComponent,
    PreviewComponent,
    SkinComponent,
];
class PickerModule {
}
PickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, EmojiModule],
                exports: components,
                declarations: components,
                providers: [EmojiSearch, EmojiFrequentlyService],
            },] },
];
/** @nocollapse */
PickerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { AnchorsComponent, CategoryComponent, EmojiFrequentlyService, EmojiSearch, PickerComponent, PickerModule, PreviewComponent, SearchComponent, SkinComponent };
//# sourceMappingURL=ctrl-ngx-emoji-mart.js.map
