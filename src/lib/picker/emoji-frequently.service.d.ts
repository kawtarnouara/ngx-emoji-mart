import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji/data/data.interfaces';
export declare class EmojiFrequentlyService {
    NAMESPACE: string;
    frequently: {
        [key: string]: number;
    } | null;
    defaults: {
        [key: string]: number;
    };
    initialized: boolean;
    DEFAULTS: string[];
    init(): void;
    add(emoji: EmojiData): void;
    get(perLine: number): any[];
}
