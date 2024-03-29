import logoNavBar from "../../../assets/img/logoNavBar.png";
import logoNameNavBar from "../../../assets/img/logoNameNavBar.png";
import menuOpenNavBar from "../../../assets/img/menuOpenNavBar.png";
import { openMobileMenu } from "../../../role_all/components/wrappers/MobileMenuWrapper";

export function Navbar() {
	return (
		<>
			<div className="flex items-center">
				<a href="https://miss-you.ru">
					<img
						className="block h-12 rounded-full w-auto"
						src={logoNavBar}
						alt="Logo"
					/>
				</a>
				<img
					className="visible h-8 ml-2 w-auto"
					src={logoNameNavBar}
					alt="LogoName"
				/>
			</div>
			<img
				className="visible md:hidden cursor-pointer h-8 ml-2 w-auto"
				src={menuOpenNavBar}
				onClick={openMobileMenu}
				alt="LogoMenu"
			/>
		</>
	);
}
