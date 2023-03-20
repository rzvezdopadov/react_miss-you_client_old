import { configureStore } from "@reduxjs/toolkit";
import { jwtReducer, registrationReducer } from "./redusers/auth";
import {
	dialogReducer,
	dialogsReducer,
	stickerpacksReducer,
} from "./redusers/dialog";
import { mobileMenuReducer } from "./redusers/menu";
import {
	modalAddDeleteStickerpackReducer,
	modalBuyRatingReducer,
	modalDialogReducer,
	modalLoadingReducer,
	modalMessageReducer,
	modalPhotoDeleteReducer,
	modalPhotoEditorReducer,
	modalReviewStickerpackReducer,
} from "./redusers/modal";
import { myVaporsReducer } from "./redusers/vapor";
import { filtersUserReducer } from "./redusers/filterusers";
import {
	settingProfileCharactersReducer,
	userMyProfileReducer,
	userProfileReducer,
	usersProfilesReducer,
} from "./redusers/profile";
import { socketReducer } from "./redusers/socket";
import {
	adminFiltersUserReducer,
	modalAdminBannedReducer,
	modalAdminChangeCashReducer,
	modalAdminChangeRatingReducer,
} from "./redusers/admin";

export const store = configureStore({
	reducer: {
		jwt: jwtReducer,
		registration: registrationReducer,
		mobileMenu: mobileMenuReducer,
		modalLoading: modalLoadingReducer,
		modalMessage: modalMessageReducer,
		modalPhotoDelete: modalPhotoDeleteReducer,
		modalBuyRating: modalBuyRatingReducer,
		modalDialog: modalDialogReducer,
		modalPhotoEditor: modalPhotoEditorReducer,
		modalReviewStickerpack: modalReviewStickerpackReducer,
		modalAddDeleteStickerpack: modalAddDeleteStickerpackReducer,
		myVapors: myVaporsReducer,
		filtersUser: filtersUserReducer,
		usersProfiles: usersProfilesReducer,
		userProfile: userProfileReducer,
		userMyProfile: userMyProfileReducer,
		settingProfileCharacters: settingProfileCharactersReducer,
		dialogs: dialogsReducer,
		dialog: dialogReducer,
		stickerpacks: stickerpacksReducer,
		socket: socketReducer,
		adminFiltersUser: adminFiltersUserReducer,
		modalAdminChangeRating: modalAdminChangeRatingReducer,
		modalAdminChangeCash: modalAdminChangeCashReducer,
		modalAdminBanned: modalAdminBannedReducer,
	},
});
