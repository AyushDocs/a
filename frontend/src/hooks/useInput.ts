/** @format */

import React, { ChangeEvent, useState } from 'react';

const useInput: (init: string) => [
	string,
	{
		onChange: (e: ChangeEvent<HTMLInputElement>) => void;
		value: string;
	},
	() => void,
	React.Dispatch<React.SetStateAction<string>>
] = (init: string = '') => {
	const [state, setState] = useState<string>(init);
	const bind: {
		onChange: (e: ChangeEvent<HTMLInputElement>) => void;
		value: string;
	} = {
		onChange: (e: ChangeEvent<HTMLInputElement>) => {
			setState(e.currentTarget.value);
			return e.currentTarget.value;
		},
		value: state,
	};
	const reset: () => void = () => setState(init);
	return [state, bind, reset, setState];
};
export default useInput;
