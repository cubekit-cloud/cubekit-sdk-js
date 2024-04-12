export default interface IStorageFile {
	bucket_name: string;
	object_name: string;
	full_name: string;
	updated_at: string;
	is_file: boolean;
	size: number;
	url: string;
}
