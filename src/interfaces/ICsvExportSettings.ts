import { ExportEncodingTypesEnum } from "../enums";


export default interface ICsvExportSettings {
    input_encoding?: ExportEncodingTypesEnum;
    output_encoding?: ExportEncodingTypesEnum;
}