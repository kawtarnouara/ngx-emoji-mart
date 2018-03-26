import { ChangeDetectorRef, EventEmitter, OnChanges } from '@angular/core';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji/emoji.service';
import {  EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji/data/data.interfaces';
export declare class PreviewComponent implements OnChanges {
    ref: ChangeDetectorRef;
    private emojiService;
    title: any;
    emoji: any;
    idleEmoji: any;
    emojiNative: any;
    emojiSize: any;
    emojiSkin: any;
    emojiSet: any;
    emojiSheetSize: any;
    emojiBackgroundImageFn: any;
    skinChange: EventEmitter<number>;
    emojiData: EmojiData;
    listedEmoticons: string[];
    constructor(ref: ChangeDetectorRef, emojiService: EmojiService);
    ngOnChanges(): void;
}
