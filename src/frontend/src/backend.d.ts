import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Variant {
    name: string;
    shippingCountries: Array<string>;
    specs: Array<Setting>;
    currency: string;
    price: bigint;
}
export interface Setting {
    value: string;
    name: string;
}
export interface Product {
    apps: Array<string>;
    name: string;
    tags: Array<string>;
    variants: Array<Variant>;
    version: string;
    specs: Array<Setting>;
    notes: Array<string>;
    colors: Array<string>;
}
export interface backendInterface {
    getAllProducts(): Promise<Array<Product>>;
    getProduct(name: string): Promise<Product>;
}
