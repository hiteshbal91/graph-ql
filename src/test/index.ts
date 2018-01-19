import { times } from 'lodash';
import { parseString as XML2JSParser } from 'xml2js';

import { PdfGenerator, USPS } from '../lib/third-party';
import { Helper } from './../framework/utils';

describe("Generating pdf", () => {
    // beforeAll("setup", () => {
    //     return Promise.resolve();
    // })

    it("checking pdf", () => {
        const Status = { order_no: "123123123123123", tracking_no: "123123123123123123", name: "Dummy Test", "response": { "summary": ["Your item was delivered in or at the mailbox at 11:18 am on November 4, 2017 in BELLEVIEW, FL 34420."], "info": ["Out for Delivery, November 4, 2017, 8:06 am, BELLEVIEW, FL 34420", "Sorting Complete, November 4, 2017, 7:56 am, BELLEVIEW, FL 34420", "Arrived at Post Office, November 4, 2017, 7:16 am, BELLEVIEW, FL 34420", "Departed USPS Regional Facility, November 3, 2017, 3:52 pm, JACKSONVILLE FL NETWORK DISTRIBUTION CENTER", "Arrived at USPS Regional Facility, November 3, 2017, 1:56 pm, JACKSONVILLE FL NETWORK DISTRIBUTION CENTER", "In Transit to Destination, November 3, 2017, 9:21 am, On its way to ZIP Code 34420", "Departed USPS Regional Facility, November 3, 2017, 8:58 am, YBOR CITY FL DISTRIBUTION CENTER", "Arrived at USPS Regional Origin Facility, November 2, 2017, 8:15 pm, YBOR CITY FL DISTRIBUTION CENTER", "Accepted at USPS Origin Facility, November 2, 2017, 7:00 pm, CLEARWATER, FL 33762", "Shipping Label Created, USPS Awaiting Item, November 2, 2017, 2:12 pm, CLEARWATER, FL 33762"] } };
        return PdfGenerator.generate("test1", PdfGenerator.getTemplate(Status))
            .then((result) => {
                console.log("result : ", result.path)
                expect(result).not.toBeNull();
            }).catch((err) => {
                console.log("Error : ", err);
                return Promise.reject(err);
            });
    });

    it("checking xml to json converter", (done) => {
        const DummyXML = `<?xml version="1.0" encoding="UTF-8"?>
        <TrackResponse><TrackInfo ID="9400110200793563795219"><TrackSummary>The Postal Service could not locate the tracking information for your request. Please verify your tracking number and try again later.</TrackSummary></TrackInfo></TrackResponse>`;

        XML2JSParser(DummyXML, (err, result) => {
            const Result = USPS.parseResponse(result)
            console.log("result : ", JSON.stringify(Result))
            expect(Result).not.toBeNull();
            done();
        });
    });

    it("checking sequence : ", (done) => {
        const Calls = times(3, (index) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`index : ${index}`);
                    resolve();
                }, 1000);
            })
        });
        // console.log("calls : ", Helper.execSequence(Calls))
        return Helper.execSequence(Calls).then((result) => {
            return done();
        }).catch((error) => {
            return done(error);
        });
    })
});