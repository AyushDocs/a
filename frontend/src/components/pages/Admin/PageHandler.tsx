/** @format */

import React, { useEffect, useRef } from 'react';
interface Props {
	Offset: number;
	isLast: boolean;
	setOffset: React.Dispatch<React.SetStateAction<number>>;
}
const PageHandler: React.FC<Props> = ({ Offset, isLast, setOffset }) => {
	const backBtn = useRef<HTMLButtonElement>(null);
	const nextBtn = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (backBtn.current == null || nextBtn.current == null) return;
		if (Offset === 0) {
			backBtn.current.disabled = true;
		}
		if (Offset !== 0 && backBtn.current.disabled === true) {
			backBtn.current.disabled = false;
		}
		if (isLast) {
			nextBtn.current.disabled = true;
		}
		if (!isLast && nextBtn.current.disabled === true) {
			nextBtn.current.disabled = false;
		}
	}, [Offset, isLast]);

	return (
		<div className='d-flex justify-content-between'>
			<button ref={nextBtn} onClick={() => setOffset(value => value - 1)} className='btn-sm btn btn-danger'>
				←Back
			</button>
			<button ref={nextBtn} onClick={() => setOffset(value => value + 1)} className='btn-sm btn btn-danger'>
				Next→
			</button>
		</div>
	);
};

export default PageHandler;
