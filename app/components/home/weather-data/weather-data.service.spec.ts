import { TestBed, getTestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Response, HttpModule, Http, XHRBackend }
    from '@angular/http';


import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { WeatherDataService } from './weather-data.service';
import { TimeService } from '../../../shared/time.service';

describe('WeatherDataService', () => {
    let mockBackend: MockBackend;
    let mockRealtimeData = {
        time: '11/May/2016 23:24',
        outTemp: { value: '15.0', unit: '&degC' },
    };
    let newMockData = {
        time: ((new Date(mockRealtimeData.time)).getTime() / 1000 + 50).toString(),
        outTemp: '20.1'
    };
    let oldMockData = {
        time: ((new Date(mockRealtimeData.time)).getTime() / 1000 - 50).toString(),
        outTemp: '13.1'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                WeatherDataService,
                TimeService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ],
            imports: [
                HttpModule
            ]
        });

        mockBackend = getTestBed().get(MockBackend);
    }));

    it('should get realtime weather data values',
        async(inject([WeatherDataService],
            (weatherDataService: WeatherDataService) => {
                mockBackend.connections.subscribe(
                    (connection: MockConnection) => {
                        connection.mockRespond(new Response(
                            new ResponseOptions({
                                body: JSON.stringify(mockRealtimeData)
                            }
                            )));
                    });

                fakeAsync(() => {
                    tick(500);
                    let data = weatherDataService.getRealtimeData();
                    expect(data).toBeDefined();
                    expect(data.time).toEqual(mockRealtimeData.time,
                        'time should be the same');
                    expect(data.outTemp.value)
                        .toEqual(mockRealtimeData.outTemp.value,
                        'outTemp should be the same');
                    expect(data.outTemp.unit)
                        .toEqual(mockRealtimeData.outTemp.unit,
                        'unit should be the same');
                });

            }))
    );

    it('should update to newer data values',
        async(inject([WeatherDataService],
            (weatherDataService: WeatherDataService) => {
                mockBackend.connections.subscribe(
                    (connection: MockConnection) => {
                        connection.mockRespond(new Response(
                            new ResponseOptions({
                                body: JSON.stringify(newMockData)
                            }
                            )));
                    });

                fakeAsync(() => {
                    tick(500);
                    weatherDataService.rapidUpdate();
                    let update = weatherDataService.getRealtimeData();
                    expect(update).toBeDefined();
                    expect((new Date(update.time)).getTime().toString())
                        .toEqual(
                        (parseFloat(newMockData.time) * 1000).toString(),
                        'time should be greater');
                    expect(update.outTemp.value)
                        .toEqual(newMockData.outTemp,
                        'outTemp should different');
                });



            }))
    );
    it('should NOT update to outdated data',
        async(inject([WeatherDataService],
            (weatherDataService: WeatherDataService) => {
                mockBackend.connections.subscribe(
                    (connection: MockConnection) => {
                        connection.mockRespond(new Response(
                            new ResponseOptions({
                                body: JSON.stringify(oldMockData)
                            }
                            )));
                    });
                fakeAsync(() => {
                    tick(500);
                    weatherDataService.rapidUpdate();
                    let update = weatherDataService.getRealtimeData();
                    expect(update.time).toEqual(mockRealtimeData.time);
                });
            }))
    );

});
