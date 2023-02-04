import { useEffect, useState } from "react";
import { ShopRatingRate } from "./ShopRatingRate";
import stars from "../../../assets/img/stars.png";
import { useQueryGetRatingTariffs } from "../../../hooks/api.hook";
import { IRate } from "../../../interfaces/ishop";
import { store } from "../../../store/store";
import { ModalBuyRating } from "../../modal/ModalBuyRating";
import { LabelHeaderLG, Rating } from "../../utils/Labels";
import { modalMessageOpen } from "../../modal/ModalMessage";

export function ShopRating() {
	const { userMyProfile } = store.getState();
	const [ratingTariffs, setRatingTariffs] = useState<Array<IRate>>([]);
	const { dataRatingTariffs, errorRatingTariffs, querySendGetRatingTariffs } =
		useQueryGetRatingTariffs();

	useEffect(() => {
		querySendGetRatingTariffs();
	}, []);

	useEffect(() => {
		if (dataRatingTariffs) {
			setRatingTariffs(dataRatingTariffs);
		} else if (errorRatingTariffs) {
			modalMessageOpen(errorRatingTariffs.response.data.message);
		}
	}, [dataRatingTariffs, errorRatingTariffs]);

	return (
		<div
			className={`flex flex-col justify-start items-center w-full h-full`}
		>
			<LabelHeaderLG value={"Приобрести рейтинг"} />
			<div className="w-48">
				<Rating value={userMyProfile?.rating} />
			</div>
			<div className="flex justify-center flex-wrap m-4 w-full">
				{ratingTariffs.length ? (
					ratingTariffs.map((value) => {
						return (
							<ShopRatingRate
								key={value.idRate}
								idRate={value.idRate}
								amountRate={value.amountRate}
								price={value.price}
								discount={value.discount}
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
			<ModalBuyRating />
		</div>
	);
}