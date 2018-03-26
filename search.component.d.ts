import { AfterViewInit, EventEmitter } from '@angular/core';
import { EmojiSearch } from './emoji-search.service';
export declare class SearchComponent implements AfterViewInit {
    private emojiSearch;
    maxResults: number;
    autoFocus: boolean;
    i18n: any;
    include: string[];
    exclude: string[];
    custom: any[];
    emojisToShowFilter?: (x: any) => boolean;
    search: EventEmitter<any>;
    private inputRef?;
    query: string;
    constructor(emojiSearch: EmojiSearch);
    ngAfterViewInit(): void;
    handleChange(): void;
}
