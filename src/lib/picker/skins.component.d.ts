import { EventEmitter } from '@angular/core';
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji/emoji.component';
export declare class SkinComponent {
    skin: Emoji['skin'];
    change: EventEmitter<number>;
    opened: boolean;
    skinTones: number[];
    toggleOpen(): void;
    handleClick(skin: number): void;
}
