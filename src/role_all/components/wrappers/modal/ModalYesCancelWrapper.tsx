import React from "react";
import { useRefDivVisible } from "../../../hooks/form.hook";

export function ModalYesCancelWrapper(payload: {
	children: React.ReactNode;
	enabled: boolean;
}) {
	const refModalYesCancel = useRefDivVisible(payload.enabled);

	return (
		<div
			ref={refModalYesCancel}
			className="flex flex-col invisible fixed justify-center items-center bg-gray-900 shadow-[0px_0px_2px_2px] shadow-lime-300 text-neutral-50 rounded-xl top-0 bottom-0 left-0 right-0 m-auto px-2 pt-2 z-30 pb-2 min-h-36 max-h-fit w-80"
		>
			{payload.children}
		</div>
	);
}
