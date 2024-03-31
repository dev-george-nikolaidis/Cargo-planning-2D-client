import React from "react";
import { Helmet } from "react-helmet-async";

interface Props {
	children?: React.ReactNode;
	pageTitle: string;
	pagePath?: string;
}

export default function Seo({ children, pageTitle, pagePath }: Props) {
	return (
		<Helmet prioritizeSeoTags>
			<title>Cargo Planning | {pageTitle}</title>
			<link rel="canonical" href={pagePath} />
			<meta
				name="keywords"
				content="Cargo Planning
				Web application for logistics
				Truck trip management
				Efficient logistics software
				Transportation management system
				Visualize truck trips
				Organize transportation"
			></meta>
			<meta
				name="description"
				content="Cargo Planning: Streamline your logistics with our web application designed for efficient truck trip management. Visualize and organize transportation effortlessly, enhancing your logistics operations"
			/>

			{/* <!-- Open Graph Meta Tags (for social media sharing)  */}
			<meta property="og:title" content="Cargo Planning" />
			<meta
				property="og:description"
				content="Cargo Planning: Streamline your logistics with our web application designed for efficient truck trip management. Visualize and organize transportation effortlessly, enhancing your logistics operations"
			/>
			<meta property="og:image" content="https://res.cloudinary.com/dsrzlxnkc/image/upload/v1708356767/kmmkpbwtdq9fi3mqz0tw.png" />
			<meta property="og:url" content="https://cargo-planning.netlify.app/trip/side/1" />
			<meta property="og:type" content="website" />

			{/* <!-- Twitter Meta Tags (for Twitter sharing) --> */}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content="Cargo Planning" />
			<meta
				name="twitter:description"
				content="Cargo Planning: Streamline your logistics with our web application designed for efficient truck trip management. Visualize and organize transportation effortlessly, enhancing your logistics operations"
			/>
			<meta name="twitter:image" content="https://res.cloudinary.com/dsrzlxnkc/image/upload/v1708356767/kmmkpbwtdq9fi3mqz0tw.png" />
			{children}
		</Helmet>
	);
}
