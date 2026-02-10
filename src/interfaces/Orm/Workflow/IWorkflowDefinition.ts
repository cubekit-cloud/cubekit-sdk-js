export interface IWorkflowDefinition {
	id: string;
	code: string;
	name: string;
	orm_status_field: string;
	orm_meta_field: string;
	orm_integration: ORMIntegration;
}

interface ORMIntegration {
	x_api_key: string;
	tenant_application_id: string;
	tenant_application_name: string;
	tenant_application_slug: string;
	tenant_application_table: string;
	tenant_application_model_id: string;
}
