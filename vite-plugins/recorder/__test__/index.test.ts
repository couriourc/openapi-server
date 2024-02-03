import recorder, {ICalledRecorde, Recorder} from '..';

describe('Recorder', () => {

    const record: ICalledRecorde = {
        path: "/a/b",
        method: 'get'
    }
    it("should be a recorder", () => {
        expect(recorder).toBeInstanceOf(Recorder);
    })
    it("should be a auto add one", () => {
        recorder.call(record)
        expect(recorder.inspect(record)).toEqual(1)
        recorder.call(record)
        expect(recorder.inspect(record)).toEqual(2)
    })
})