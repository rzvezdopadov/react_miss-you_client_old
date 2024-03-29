import { useEffect, useState } from "react";
import { RatingRate } from "./RatingRate";
import stars from "../../../../../assets/img/stars.png";
import { store } from "../../../../store/store";
import {
	LabelWidget,
	LabelRating,
	Label,
} from "../../../../../role_all/components/utils/Labels";

import {
	useQueryBuyRating,
	useQueryGetRatingTariffs,
} from "../../../../../role_user/api/shop/rating/rating.api.hook";
import { ButtonsYesCancelWidget } from "../../../../../role_all/components/widgets/utils/Buttons";
import { modalMessageOpen } from "../../../../../role_all/components/modal/ModalMessage";
import {
	ITariff,
	ITariffModal,
} from "../../../../../role_all/interfaces/ishop";
import { storeAll } from "../../../../../role_all/store/storeAll";
import { userMyProfileAction } from "../../../../../role_all/store/redusers/profile";
import { ModalYesCancelWrapper } from "../../../../../role_all/components/wrappers/modal/ModalYesCancelWrapper";

export function Rating() {
	const { userMyProfile } = storeAll.getState();
	const [ratingTariffs, setRatingTariffs] = useState<ITariff[]>([]);
	const { dataRatingTariffs, errorRatingTariffs, querySendGetRatingTariffs } =
		useQueryGetRatingTariffs();

	const initRate = { idTariff: "", amountRate: 0, discount: 0, price: 0 };
	const { dataBuyRating, errorBuyRating, querySendBuyRating } =
		useQueryBuyRating();
	const [modalRatingTariff, setModalRatingTariff] = useState<ITariffModal>({
		enabled: false,
		tariff: initRate,
	});

	useEffect(() => {
		querySendGetRatingTariffs();
	}, []);

	useEffect(() => {
		if (!dataRatingTariffs) return;

		setRatingTariffs(dataRatingTariffs);
	}, [dataRatingTariffs]);

	useEffect(() => {
		if (dataRatingTariffs) {
			setRatingTariffs(dataRatingTariffs);
		} else if (errorRatingTariffs) {
			modalMessageOpen(errorRatingTariffs.response.data.message);
		}
	}, [dataRatingTariffs, errorRatingTariffs]);

	useEffect(() => {
		if (!dataBuyRating) return;

		storeAll.dispatch(userMyProfileAction(dataBuyRating));
		modalMessageOpen("Покупка прошла успешно!");
		modalBuyRatingCloseHandler();
	}, [dataBuyRating]);

	useEffect(() => {
		if (!errorBuyRating) return;

		modalMessageOpen(errorBuyRating.response.data.message);
		modalBuyRatingCloseHandler();
	}, [errorBuyRating]);

	const modalBuyRatingCloseHandler = () =>
		setModalRatingTariff({ enabled: false, tariff: initRate });

	return (
		<div
			className={`flex flex-col justify-start items-center w-full h-full`}
		>
			<LabelWidget value={"Приобрести рейтинг"} />
			<Label value={"Чем выше рейтинг, тем вы выше в выдаче"} />
			<div className="w-48">
				<LabelRating value={userMyProfile?.rating} />
			</div>
			<div className="flex justify-center flex-wrap m-4 w-full">
				{ratingTariffs.length ? (
					ratingTariffs.map((tariff, i) => {
						return (
							<RatingRate
								key={tariff.idTariff}
								tariff={ratingTariffs[i]}
								openModalClbk={() =>
									setModalRatingTariff({
										enabled: true,
										tariff: tariff,
									})
								}
							/>
						);
					})
				) : (
					<div className="flex">Тарифы пока отсутствуют ^..^</div>
				)}
			</div>
			<div className="flex w-full max-w-4xl h-full">
				<div
					style={{
						backgroundImage: `URL(${stars})`,
					}}
					className="flex bg-contain bg-bottom bg-no-repeat w-full h-full"
				></div>
			</div>

			<ModalYesCancelWrapper enabled={modalRatingTariff.enabled}>
				<Label
					value={`Вы действительно хотите купить ${modalRatingTariff.tariff.amountRate} баллов рейтинга за ${modalRatingTariff.tariff.price} MY-баллов?`}
				/>
				<ButtonsYesCancelWidget
					onClickYes={() => {
						querySendBuyRating(modalRatingTariff.tariff.idTariff);
					}}
					onClickCancel={modalBuyRatingCloseHandler}
				/>
			</ModalYesCancelWrapper>
		</div>
	);
}
