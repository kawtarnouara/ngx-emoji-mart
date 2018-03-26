import { EventEmitter } from '@angular/core';
import { EmojiCategory } from '@ctrl/ngx-emoji-mart/ngx-emoji/data/data.interfaces';
export declare class AnchorsComponent {
    categories: EmojiCategory[];
    color?: string;
    selected?: string;
    anchorClick: EventEmitter<{
        category: EmojiCategory;
        index: number;
    }>;
    svgs: any;
    handleClick($event: Event, index: number): void;
}
