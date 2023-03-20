import * as React from "react";
import { useEffect } from "react";
import { IProfile } from "../../interfaces/iprofiles";
import { store } from "../../store/store";
import { LabelCash, LabelRating } from "../utils/Labels";
import { Button, ButtonClose } from "../utils/Buttons";
import {
	initialStateUserProfile,
	userProfileAction,
} from "../../store/redusers/profile";
import { dialogAction } from "../../store/redusers/dialog";
import { modalDialogClose } from "./ModalDialog";
import { modalMessageOpen } from "./ModalMessage";
import { DateTimeVisit } from "../utils/DateTime";
import { UserProfileInterests } from "../widgets/userprofile/UserProfileInterests";
import { UserProfilePersonal } from "../widgets/userprofile/UserProfilePersonal";
import { UserProfileQuality } from "../widgets/userprofile/UserProfileQuality";
import { UserProfileAboutMe } from "../widgets/userprofile/UserProfileAboutMe";
import { UserProfileNameAge } from "../widgets/userprofile/UserProfileNameAge";
import { useQueryGetDialog } from "../../api/dialog/dialog.api.hook";
import { IQueryDialog } from "../../api/dialog/idialog.api";
import {
	ModalAdminChangeRating,
	modalAdminChangeRatingClose,
	modalAdminChangeRatingOpen,
} from "./ModalAdminChangeRating";
import {
	ModalAdminChangeCash,
	modalAdminChangeCashClose,
	modalAdminChangeCashOpen,
} from "./ModalAdminChangeCash";
import {
	ModalAdminBanned,
	modalAdminBannedClose,
	modalAdminBannedOpen,
} from "./ModalAdminBanned";
import { AdminUserProfileSlider } from "../widgets/admin/AdminUserProfileSlider";
import { UserProfileInterest } from "../widgets/userprofile/UserProfileInterest";
import { ModalAdminPhotoDelete } from "./ModalAdminPhotoDelete";
import { useRefDivVisible } from "../../hooks/form.hook";

export function modalAdminUserProfileOpen(profile: IProfile) {
	store.dispatch(userProfileAction(true, profile));
}

function modalAdminUserProfileClose() {
	store.dispatch(userProfileAction(false, initialStateUserProfile.profile));
}

export function ModalAdminUserProfile() {
	const { dataGetDialog, errorGetDialog, querySendGetDialog } =
		useQueryGetDialog();
	const { userProfile } = store.getState();
	const refUserProfile = useRefDivVisible(userProfile.enabled);

	useEffect(() => {
		if (!dataGetDialog) return;

		// modalDialogOpen();
		store.dispatch(dialogAction(dataGetDialog));
	}, [dataGetDialog]);

	useEffect(() => {
		if (!errorGetDialog) return;

		modalMessageOpen(errorGetDialog.response.data.message);
	}, [errorGetDialog]);

	const modalDialogOpenHandler = () => {
		const data: IQueryDialog = {
			userid: userProfile.profile.userid,
		};

		querySendGetDialog(data);
	};

	const closeUserProfileHandler = () => {
		modalDialogClose();
		modalAdminChangeRatingClose();
		modalAdminChangeCashClose();
		modalAdminBannedClose();
		modalAdminUserProfileClose();
	};

	return (
		<div
			ref={refUserProfile}
			className="flex flex-col invisible fixed justify-start bg-gray-900 shadow-[0px_0px_5px_5px] shadow-lime-300 text-neutral-50 rounded-xl overflow-y-scroll lg:overflow-auto top-0 bottom-0 left-0 right-0 m-auto px-2 pt-2 z-20 pb-2 h-full lg:h-2/3 lg:max-w-5xl"
		>
			<ButtonClose onClick={closeUserProfileHandler} />

			<div className="flex flex-wrap mt-4 flex-col lg:flex-row justify-center items-center h-fit w-full">
				<div className="flex flex-col">
					<AdminUserProfileSlider />
					<UserProfileInterest
						value={`userid = "${userProfile.profile.userid}"`}
						title={`userid = "${userProfile.profile.userid}"`}
					/>
					<LabelRating
						value={userProfile.profile.rating}
						onClick={() => {
							modalAdminChangeRatingOpen(
								userProfile.profile.userid
							);
						}}
					/>
					<LabelCash
						value={userProfile.profile.cash}
						onClick={() => {
							modalAdminChangeCashOpen(
								userProfile.profile.userid
							);
						}}
					/>
					<Button
						value={"Написать сообщение"}
						onClick={modalDialogOpenHandler}
					/>

					<Button
						value={"Забанить/разбанить"}
						onClick={() => {
							modalAdminBannedOpen(userProfile.profile.userid);
						}}
					/>
				</div>

				<div className="flex items-center flex-col">
					<UserProfileNameAge profile={userProfile.profile} />

					<DateTimeVisit profile={userProfile.profile} />
					<UserProfileAboutMe
						discription={userProfile.profile.discription}
					/>
					<UserProfilePersonal profile={userProfile.profile} />
					<UserProfileInterests profile={userProfile.profile} />
					<UserProfileQuality profile={userProfile.profile} />
				</div>
			</div>
			<ModalAdminChangeRating />
			<ModalAdminChangeCash />
			<ModalAdminBanned />
			<ModalAdminPhotoDelete />
		</div>
	);
}
