import {reduce} from "lodash";

export interface ICalledRecorde {
    // 路径
    path: string;
    // 方法
    method: string;
    // 被调用的次数
}

type TCalledCount = number;
export type TRecordId = Lowercase<`${ICalledRecorde['path']}-${ICalledRecorde['method']}`>;

export class Recorder {
    called_map: Map<TRecordId, TCalledCount> = new Map();

    static id(entity: ICalledRecorde): TRecordId {
        return `${entity.path}-${entity.method}`.toLowerCase() as TRecordId;
    }

    invoke(record: ICalledRecorde, initial = false) {
        let count: TCalledCount | void = this.called_map.get(Recorder.id(record));
        if (!count) {
            count = 0
        }
        if (initial) this.called_map.set(Recorder.id(record), count + 1)
        return record;
    }

    inspect(record: ICalledRecorde) {
        return this.called_map.get(Recorder.id(record));
    }

    static init(apis: ICalledRecorde[]) {
        const recorder = new Recorder();
        apis.forEach((api) => {
            recorder.invoke(api, true)
        })
        return recorder;
    }
}

