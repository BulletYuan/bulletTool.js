const chai = require('./libs/chai');
const should = chai.should();
const Time = require('./components/Time');

describe("component test : Url module\nset default url is 'http://'", () => {
    const time = new Time('2008-4-30')
    it('Time.timestamp()', () => {
        time.timestamp().should.equal(1209484800000);
    });
    it('Time.timestamp_10()', () => {
        time.timestamp_10().should.equal(1209484800);
    });
    it('Time.timeFormat()', () => {
        time.timeFormat().should.equal("2008-04-30 00:00:00");
    });
});