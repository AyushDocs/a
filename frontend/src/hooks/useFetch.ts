/** @format */

import { useCallback, useEffect, useState } from 'react';

const useFetch = <T>(url: string, options: RequestInit) => {
	const [Loading, setLoading] = useState(false);
	const [Data, setData] = useState<T>();
	const [Error, setError] = useState<unknown>();
	const [Response, setResponse] = useState<Response>();
	const getData = useCallback(
		async (isMounted: boolean) => {
			try {
				if (!isMounted) return;
				setLoading(true);
				const res = await fetch(url, options);
				setResponse(res);
				if (!isMounted) return;
				const data: T = await res.json();
				setData(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[options, url]
	);

	useEffect(() => {
		let isMounted = true;
		getData(isMounted);
		return () => {
			isMounted = false;
		};
	}, [getData]);
	return { Loading, Data, Error, Response };
};

export default useFetch;
