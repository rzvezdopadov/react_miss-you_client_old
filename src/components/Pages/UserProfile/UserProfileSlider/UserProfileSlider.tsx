import * as React from "react";
import { useState } from "react";
import { store } from "../../../../utils/store";
import { setLike } from "../../../Utils/Socket/Socket";
import {
	SliderPhotoBtnLeft,
	SliderPhotoBtnLike,
	SliderPhotoBtnRight,
} from "../../../Utils/Sliders/Sliders";

export function UserProfileSlider() {
	const { userProfile } = store.getState();
	const [positionPhoto, setPositionPhoto] = useState(0);

	if (positionPhoto > userProfile.profile.photolink.length - 1) {
		setTimeout(() => {
			setPositionPhoto(0);
		}, 50);
	}

	const leftBtnSlideHandler = () => {
		let posPhoto = positionPhoto;

		if (userProfile.profile.photolink.length > 0) {
			posPhoto--;

			if (posPhoto < 0) {
				posPhoto = userProfile.profile.photolink.length - 1;
			}
		}

		setPositionPhoto(posPhoto);
	};

	const rightBtnSlideHandler = () => {
		let posPhoto = positionPhoto;

		if (userProfile.profile.photolink.length > 0) {
			posPhoto++;

			if (posPhoto > userProfile.profile.photolink.length - 1) {
				posPhoto = 0;
			}
		}

		setPositionPhoto(posPhoto);
	};

	let colorHeart = "bg-red-500";

	if (userProfile.profile.likes.length === 0) {
		colorHeart = "bg-white";
	}

	return (
		<>
			<div
				style={{
					backgroundImage:
						"URL(" +
						userProfile.profile.photolink[positionPhoto] +
						")",
				}}
				className="flex bg-center bg-cover bg-no-repeat shadow-[0px_0px_3px_3px] shadow-lime-300 rounded-2xl justify-center h-80 w-80 m-1"
				onClick={rightBtnSlideHandler}
			></div>

			<div className="flex justify-center m-1">
				{positionPhoto + 1} / {userProfile.profile.photolink.length}
			</div>

			<div className="flex justify-center cursor-pointer m-1 rounded-md">
				<SliderPhotoBtnLeft
					photolink={userProfile.profile.photolink}
					onClick={leftBtnSlideHandler}
				/>
				<SliderPhotoBtnLike
					likes={userProfile.profile.likes}
					onClick={setLike}
				/>
				<SliderPhotoBtnRight
					photolink={userProfile.profile.photolink}
					onClick={rightBtnSlideHandler}
				/>
			</div>
		</>
	);
}
