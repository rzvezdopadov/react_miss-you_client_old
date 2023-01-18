import { useState } from "react";
import { store } from "../../../../../utils/store";
import { getLinkSticker } from "../../../../../utils/stickers";

export function Stickers() {
	const { stickerpacks } = store.getState();
	const [stikersBookMark, setStickersBookMark] = useState(0);
	return (
		<div className="flex flex-col justify-center items-start text-sm absolute cursor-auto bottom-12 right-0 z-40 rounded-md shadow-[0px_0px_3px_3px] shadow-lime-300 bg-slate-700 h-72 w-72">
			<div className="flex flex-wrap overflow-y-scroll h-60 w-72">
				{stickerpacks[stikersBookMark]?.stickers.map((value) => {
					return (
						<div
							style={{
								backgroundImage: `URL(${getLinkSticker(
									value.link
								)})`,
							}}
							key={`stickers${value.position}`}
							className="flex bg-center bg-cover bg-no-repeat justify-center items-center text-3xl h-24 w-24 cursor-pointer"
							onClick={() => {}}
						></div>
					);
				})}
			</div>

			<div className="flex bg-slate-800 h-12 w-72">
				{stickerpacks?.map((value, index) => {
					return (
						<div
							style={{
								backgroundImage: `URL(${getLinkSticker(
									value.stickers[0].link
								)})`,
							}}
							className="flex bg-center bg-cover bg-no-repeat hover:bg-slate-500 justify-center items-center text-3xl h-10 w-10 cursor-pointer"
							key={`stickerpack${value.idstickerpack}`}
							onClick={() => {
								setStickersBookMark(index);
							}}
						></div>
					);
				})}
			</div>
		</div>
	);
}