import {FakeGenOutput} from "../core/__types__/common";

export interface ISwaggerMockPluginOption {
    api: string;
    url?: string;
    rewrite?: Partial<Record<
        keyof FakeGenOutput,
        Function
    >>;
}