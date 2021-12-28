/** @format */

import { useEffect } from 'react';

const useTitle = (title: string) => {
	useEffect(() => {
		document.title = `Alokmeds | ${title}`;
	}, [title]);
};

export default useTitle;
