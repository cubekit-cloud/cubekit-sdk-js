export default interface IXlsxExportSettings {
    styles?: {
        [key: string]: boolean | string | number;
    };
}