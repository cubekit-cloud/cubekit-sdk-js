import { FileExportTypesEnum } from "../enums";
import ICsvExportSettings from "./ICsvExportSettings";
import IExportField from "./IExportField";
import IXlsxExportSettings from "./IXlsxExportSettings";

export default interface IExportParameters<T> {
    file_name?: string;
    type?: FileExportTypesEnum;
    csv_settings: ICsvExportSettings;
    xlsx_settings: IXlsxExportSettings;
    fields: IExportField<T>[];
}