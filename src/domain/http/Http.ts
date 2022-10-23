export default interface Http {
    listen(port: number): void;
    on(url: string, method: string, fn: any): void;
    use(fn: any): void;
}
