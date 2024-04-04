export default interface IExportField<T> {
    column: keyof T;
    alias?: string;
}