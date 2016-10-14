export interface ExtremeItem {
    name: string;
    value: string;
    time: string;
    unit: string;
}

export interface Extremes {
    today: Array<ExtremeItem>;
    yesterday: Array<ExtremeItem>;
}
