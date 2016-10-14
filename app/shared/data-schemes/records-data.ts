export interface RecordsDataItem {
    name: string;
    value: string;
    date: string;
    time: string;
    unit: string;
}

export interface RecordsData extends Array<RecordsDataItem> { }
