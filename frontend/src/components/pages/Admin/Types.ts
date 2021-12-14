/** @format */

export interface ContentItem {
	query: string;
	password: string;
	id: string;
	email: string;
	query_id: string;
	date: Date;
}
export interface Data {
	content: ContentItem[];
	last: boolean;
}
