export default interface IWorkflowProcessExecuteResponse {
    status: string;
    code: number;
    message: string;
    data: any | null;
    error: {
        [key: string]: string[];
    };
    meta: any | null;
}
//# sourceMappingURL=IWorkflowProcessExecuteResponse.d.ts.map