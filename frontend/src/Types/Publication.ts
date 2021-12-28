/** @format */

export default interface Publication {
	id: number;
	name: string;
	author: string;
	link: string;
	description: string;
	imgUrl: string;
	createdDateTime: string | Date;
}
