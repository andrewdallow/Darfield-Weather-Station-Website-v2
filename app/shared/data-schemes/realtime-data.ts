export interface RealtimeDataItem {
    value: string;
    unit: string;
}

export interface RealtimeData {
    time: string;
    outTemp?: RealtimeDataItem;
    tempChangeHour?: RealtimeDataItem;
    tempMaxValueT?: RealtimeDataItem;
    tempMaxValueTimeT?: string;
    tempMinValueT?: RealtimeDataItem;
    tempMinValueTimeT?: string;
    humidity?: RealtimeDataItem;
    windchill?: RealtimeDataItem;
    dewpoint?: RealtimeDataItem;
    windSpeed?: RealtimeDataItem;
    windDir?: string;
    windDirText?: string;
    windGust?: RealtimeDataItem;
    windGustDir?: string;
    windGustDirText?: string;
    avwindlastimediate10?: RealtimeDataItem;
    avdir10minute?: string;
    avdir10minuteText?: string;
    avwindlastimediate60?: RealtimeDataItem;
    windMaxGustDir?: string;
    windMaxGustDirText?: string;
    windMaxTime?: string;
    beaufort?: string;
    beaufortDesc?: string;
    rainRate?: RealtimeDataItem;
    rainSumDay?: RealtimeDataItem;
    rainSumMonth?: RealtimeDataItem;
    rainSum?: RealtimeDataItem;
    dateoflastrainalways?: string;
    dayswithnorain?: string;
    dayswithrainmonth?: string;
    dayswithrainyear?: string;
    barometer?: RealtimeDataItem;
    barometerTrendData?: RealtimeDataItem;
    ZambrettiForcastLabel?: string;
    ZambrettiForcastCode?: string;

}
