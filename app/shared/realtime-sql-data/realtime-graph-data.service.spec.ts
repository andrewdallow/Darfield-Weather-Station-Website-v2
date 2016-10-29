import { TestBed, getTestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Response, HttpModule, Http, XHRBackend }
    from '@angular/http';


import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { RealtimeGraphDataService } from './realtime-graph-data.service';


describe('RealtimeGraphDataService', () => {
    let mockBackend: MockBackend;
    let mockData = {
        "xData": [
            1477401000000,
            1477401120000
        ],
        "datasets": {
            "temperature": [
                19.2,
                19.2
            ],
            "dewpoint": [
                7.6,
                7.3
            ],
            "windChill": [
                19.2,
                19.2
            ],
            "windSpeed": [
                11,
                16
            ],
            "windGust": [
                14,
                21
            ],
            "windDirection": [
                292,
                315
            ],
            "humidity": [
                47,
                46,
                42
            ],
            "pressure": [
                1002.3,
                1002.3
            ],
            "rainFall": [
                0,
                0
            ]
        }
    };


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                RealtimeGraphDataService,
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

    it('should get realtime weather graph values',
        async(inject([RealtimeGraphDataService],
            (realtimeGraphDataService: RealtimeGraphDataService) => {
                mockBackend.connections.subscribe(
                    (connection: MockConnection) => {
                        connection.mockRespond(new Response(
                            new ResponseOptions({
                                body: JSON.stringify(mockData)
                            }
                            )));
                    });

                realtimeGraphDataService.setGraphData(1);

                realtimeGraphDataService.getGraphData().subscribe(
                    (data) => {
                        expect(data).toBeDefined('data should be defined');
                        expect(data.xData[0]).toEqual(mockData.xData[0]);
                    }
                );

            })));


});
