import * as React from "react";
import { SelectFromArr, SelectFromArrValue } from "../../utils/Selects";
import { onChangeValueProfile } from "../../../helpers/profile";
import { userMyProfileAction } from "../../../store/redusers/profile";
import {
	data_alcohol,
	data_children,
	data_education,
	data_fieldOfActivity,
	data_gender,
	data_genderVapor,
	data_growth,
	data_maritalStatus,
	data_profit,
	data_religion,
	data_smoke,
	data_weight,
} from "../../../data/profiles";
import { WidgetWrapper } from "../../wrappers/WidgetWrapper";
import { storeAll } from "../../../store/storeAll";

export function SettingProfileGeneral() {
	const { userMyProfile, towns } = storeAll.getState();

	let date = new Date();

	date.setFullYear(date.getFullYear() - 18);

	let minDateBirth = date.toISOString().split("T")[0];

	const locationOnChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		onChangeValueProfile(e, "location", "string");
	};
	const genderOnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChangeValueProfile(e, "gender");
	};
	const genderVaporOnChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		onChangeValueProfile(e, "gendervapor");
	};
	const birhdayOnChangeHandler = (e: { target: { value: string } }) => {
		const newProfile = { ...userMyProfile };
		const date: string = e.target.value;
		const arrDate = date.split("-");

		if (arrDate.length !== 3) return;

		newProfile.yearofbirth = Number(arrDate[0]);
		newProfile.monthofbirth = Number(arrDate[1]);
		newProfile.birthday = Number(arrDate[2]);
		storeAll.dispatch(userMyProfileAction(newProfile));
	};

	const growthOnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChangeValueProfile(e, "growth");
	};
	const weightOnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChangeValueProfile(e, "weight");
	};
	const educationOnChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		onChangeValueProfile(e, "education");
	};
	const fieldofactivityOnChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		onChangeValueProfile(e, "fieldofactivity");
	};
	const maritalstatusOnChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		onChangeValueProfile(e, "maritalstatus");
	};
	const childrenOnChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		onChangeValueProfile(e, "children");
	};
	const religionOnChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		onChangeValueProfile(e, "religion");
	};
	const smokeOnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChangeValueProfile(e, "smoke");
	};
	const alcoholOnChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		onChangeValueProfile(e, "alcohol");
	};
	const profitOnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChangeValueProfile(e, "profit");
	};

	return (
		<WidgetWrapper wrap={true}>
			<SelectFromArrValue
				keyOpt={"location"}
				value={userMyProfile.location}
				onChangeHandler={locationOnChangeHandler}
				arr={towns}
				title={"Локация:"}
			/>

			<SelectFromArr
				keyOpt={"gender"}
				value={userMyProfile.gender}
				onChangeHandler={genderOnChangeHandler}
				arr={data_gender}
				title={"Кто я?"}
			/>

			<SelectFromArr
				keyOpt={"gendervapor"}
				value={userMyProfile.gendervapor}
				onChangeHandler={genderVaporOnChangeHandler}
				arr={data_genderVapor}
				title={"Кого ищу?"}
			/>

			<div className="flex justify-around bg-inherit border-2 border-lime-300 rounded-md items-center relative p-0.5 py-2 px-1 m-1.5 w-full min-[480px]:w-auto">
				<label htmlFor="date" className="text-white">
					{`Дата рождения: `}
				</label>
				&nbsp;
				<input
					value={
						"" +
						userMyProfile.yearofbirth +
						"-" +
						(userMyProfile.monthofbirth < 10
							? "0" + userMyProfile.monthofbirth
							: userMyProfile.monthofbirth) +
						"-" +
						(userMyProfile.birthday < 10
							? "0" + userMyProfile.birthday
							: userMyProfile.birthday)
					}
					className="border rounded bg-inherit text-white h-6 "
					type="date"
					max={minDateBirth}
					name="date"
					onChange={birhdayOnChangeHandler}
				/>
			</div>

			<SelectFromArrValue
				keyOpt={"growth"}
				value={userMyProfile.growth}
				onChangeHandler={growthOnChangeHandler}
				arr={data_growth}
				title={"Рост:"}
			/>

			<SelectFromArr
				keyOpt={"weight"}
				value={userMyProfile.weight}
				onChangeHandler={weightOnChangeHandler}
				arr={data_weight}
				title={"Телосложение:"}
			/>

			<SelectFromArr
				keyOpt={"education"}
				value={userMyProfile.education}
				onChangeHandler={educationOnChangeHandler}
				arr={data_education}
				title={"Образование:"}
			/>

			<SelectFromArr
				keyOpt={"fieldofactivity"}
				value={userMyProfile.fieldofactivity}
				onChangeHandler={fieldofactivityOnChangeHandler}
				arr={data_fieldOfActivity}
				title={"Сфера деятельности:"}
			/>

			<SelectFromArr
				keyOpt={"maritalstatus"}
				value={userMyProfile.maritalstatus}
				onChangeHandler={maritalstatusOnChangeHandler}
				arr={data_maritalStatus}
				title={"Семейное положение:"}
			/>

			<SelectFromArr
				keyOpt={"children"}
				value={userMyProfile.children}
				onChangeHandler={childrenOnChangeHandler}
				arr={data_children}
				title={"Дети:"}
			/>

			<SelectFromArr
				keyOpt={"religion"}
				value={userMyProfile.religion}
				onChangeHandler={religionOnChangeHandler}
				arr={data_religion}
				title={"Религия:"}
			/>

			<SelectFromArr
				keyOpt={"smoke"}
				value={userMyProfile.smoke}
				onChangeHandler={smokeOnChangeHandler}
				arr={data_smoke}
				title={"Курение:"}
			/>

			<SelectFromArr
				keyOpt={"alcohol"}
				value={userMyProfile.alcohol}
				onChangeHandler={alcoholOnChangeHandler}
				arr={data_alcohol}
				title={"Алкоголь:"}
			/>

			<SelectFromArr
				keyOpt={"profit"}
				value={userMyProfile.profit}
				onChangeHandler={profitOnChangeHandler}
				arr={data_profit}
				title={"Заработок в месяц:"}
			/>
		</WidgetWrapper>
	);
}
