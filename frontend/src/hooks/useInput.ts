/** @format */

import React, { useState } from 'react';
const useInput = (init= ''):[string, {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => string;
    value: string;
},()=>void,React.Dispatch<React.SetStateAction<string>>]=>{
	const [state, setState] = useState<string>(init);
	const bind: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => string;
    value: string;
	}= {
		onChange: (e:React.ChangeEvent<HTMLInputElement>) => {
			setState(e.currentTarget.value);
			return e.currentTarget.value;
		},
		value: state,
	};
	const reset:()=>void= () => setState(init);
	return [state, bind, reset, setState];
};
export default useInput;
