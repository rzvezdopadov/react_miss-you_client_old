import { createReducer } from "@reduxjs/toolkit";
import {
	IStateModalMessage,
	IStatePhotoDelete,
} from "../../interfaces/iredusers";
import { IStickerpack } from "../../interfaces/istickers";
import { IModalDialog } from "../../interfaces/iprofiles";
import { initialStateDialog } from "./dialog";

////////////////////////////////////////////////////////////////////////
export const MODAL_LOADING = "MODAL_LOADING";

export const modalLoadingAction = (enabled: boolean, text: string = "") => ({
	type: MODAL_LOADING,
	payload: {
		enabled,
		text,
	},
});

const initialStateModalLoading: IStateModalMessage = {
	enabled: false,
	text: "",
};

export const modalLoadingReducer = createReducer(initialStateModalLoading, {
	[MODAL_LOADING]: (state: IStateModalMessage, action: any) => {
		const { enabled, text } = action.payload;

		return { enabled, text };
	},
});
////////////////////////////////////////////////////////////////////////
export const MODAL_MESSAGE = "MODAL_MESSAGE";

export const modalMessageAction = (enabled: boolean, text: string) => ({
	type: MODAL_MESSAGE,
	payload: {
		enabled,
		text,
	},
});

const initialStateModalMessage: IStateModalMessage = {
	enabled: false,
	text: "",
};

export const modalMessageReducer = createReducer(initialStateModalMessage, {
	[MODAL_MESSAGE]: (state: IStateModalMessage, action: any) => {
		let { enabled, text } = action.payload;

		if (!enabled) text = state.text;

		return { enabled, text };
	},
});
////////////////////////////////////////////////////////////////////////
export const MODAL_PHOTO_DELETE = "MODAL_PHOTO_DELETE";

export const modalPhotoDeleteAction = (enabled: boolean, photoPos: number) => ({
	type: MODAL_PHOTO_DELETE,
	payload: {
		enabled,
		photoPos,
	},
});

const initialStateModalPhotoDelete: IStatePhotoDelete = {
	enabled: false,
	photoPos: 0,
};

export const modalPhotoDeleteReducer = createReducer(
	initialStateModalPhotoDelete,
	{
		[MODAL_PHOTO_DELETE]: (state: IStatePhotoDelete, action: any) => {
			let { enabled, photoPos } = action.payload;

			if (!enabled) photoPos = state.photoPos;

			return { enabled, photoPos };
		},
	}
);
////////////////////////////////////////////////////////////////////////
export const MODAL_DIALOG = "MODAL_DIALOG";

const initialStateModalDialog: IModalDialog = {
	enabled: false,
	dialog: initialStateDialog,
};

export const modalDialogAction = (payload: IModalDialog) => ({
	type: MODAL_DIALOG,
	payload: {
		enabled: payload.enabled,
		dialog: payload.dialog,
	},
});

export const modalDialogReducer = createReducer(initialStateModalDialog, {
	[MODAL_DIALOG]: (state: IModalDialog, action: any) => {
		const modalDialog = { ...action.payload };

		return modalDialog;
	},
});
////////////////////////////////////////////////////////////////////////
export const MODAL_PHOTO_EDITOR = "MODAL_PHOTO_EDITOR";

export const modalPhotoEditorAction = (enabled: boolean) => ({
	type: MODAL_PHOTO_EDITOR,
	payload: {
		enabled,
	},
});

export const modalPhotoEditorReducer = createReducer(false, {
	[MODAL_PHOTO_EDITOR]: (state: boolean, action: any) => {
		const modalPhotoEditor = action.payload.enabled;

		return modalPhotoEditor;
	},
});
////////////////////////////////////////////////////////////////////////
export const MODAL_STICKERPACK = "MODAL_STICKERPACK";

export const modalReviewStickerpackAction = (
	enabled: boolean,
	stickerpack: IStickerpack
) => ({
	type: MODAL_STICKERPACK,
	payload: {
		enabled,
		stickerpack,
	},
});

interface IModalReviewStickerpack {
	enabled: boolean;
	stickerpack: IStickerpack;
}

export const initialStateModalReviewStickerpack: IModalReviewStickerpack = {
	enabled: false,
	stickerpack: {
		idstickerpack: "",
		name: "",
		discription: "",
		price: 0,
		author: "",
		stickers: [],
	},
};

export const modalReviewStickerpackReducer = createReducer(
	initialStateModalReviewStickerpack,
	{
		[MODAL_STICKERPACK]: (state: IModalReviewStickerpack, action: any) => {
			const { enabled, stickerpack } = action.payload;

			return { enabled, stickerpack };
		},
	}
);

////////////////////////////////////////////////////////////////////////
export const MODAL_ADDDELETE_STICKERPACK = "MODAL_ADDDELETE_STICKERPACK";

export const modalAddDeleteStickerpackAction = (
	enabled: boolean,
	stickerpack: IStickerpack
) => ({
	type: MODAL_ADDDELETE_STICKERPACK,
	payload: {
		enabled,
		stickerpack,
	},
});

export const initialStateModalAddDeleteStickerpack: IModalReviewStickerpack = {
	enabled: false,
	stickerpack: {
		idstickerpack: "",
		name: "",
		discription: "",
		price: 0,
		author: "",
		stickers: [],
	},
};

export const modalAddDeleteStickerpackReducer = createReducer(
	initialStateModalReviewStickerpack,
	{
		[MODAL_ADDDELETE_STICKERPACK]: (
			state: IModalReviewStickerpack,
			action: any
		) => {
			const { enabled, stickerpack } = action.payload;

			return { enabled, stickerpack };
		},
	}
);
