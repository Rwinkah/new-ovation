import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface StarProps {
	rating?: number;
	filled?: boolean;
	color?: "amber" | "slate" | "red" | "green";
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	viewOnly?: boolean;
	onRate?: (rating: number) => void; // New prop for handling rating change
}

const Stars = ({
	rating = 1,
	filled = false,
	color = "amber",
	disabled = false,
	size = "lg",
	viewOnly = false,
	onRate,
}: StarProps) => {
	const [currentRating, setCurrentRating] = useState(rating);

	const starColor = {
		amber: "text-amber-500",
		slate: "text-slate-600",
		red: "text-red-500",
		green: "text-emerald-500",
	};

	const starSize = {
		sm: "w-4 h-4",
		md: "w-6 h-6",
		lg: "w-8 h-8",
	};

	const StarSVG = ({ filled }: { filled: boolean }) => (
		<svg
			viewBox="0 0 36 34"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("shrink-0 mr-2", starSize[size], {
				[starColor[color]]: filled,
				"fill-gray-400": !filled,
			})}
		>
			<path
				d="M32.403 11.4077L32.4029 11.4077L24.1512 10.2087L20.4577 2.72932L20.4574 2.72868C19.9941 1.7917 19.0473 1.41793 18.2569 1.41793C17.4662 1.41793 16.5217 1.79136 16.0553 2.72347L16.0553 2.72346L16.0521 2.72985L12.3634 10.2088L4.11197 11.4077L4.11173 11.4077C3.19696 11.5408 2.41792 12.18 2.12677 13.0792L2.12615 13.0812C1.84219 13.9631 2.07381 14.9436 2.75286 15.5977L8.72231 21.4179L7.31268 29.6343L7.31267 29.6343L7.31165 29.6404C7.16024 30.55 7.5273 31.489 8.29402 32.0424L9.02224 31.0336L8.29402 32.0424C9.04339 32.5834 10.0438 32.6674 10.8784 32.2226L18.2576 28.3467L25.6328 32.2232C25.6333 32.2235 25.6338 32.2238 25.6343 32.224C26.0086 32.4215 26.4047 32.505 26.7822 32.505C27.2873 32.505 27.7869 32.3514 28.2142 32.0472L28.2214 32.0421L28.2286 32.0368C28.9839 31.4828 29.3556 30.5554 29.2033 29.6404L29.2022 29.6343L27.7926 21.4179L33.7642 15.5956C33.7645 15.5953 33.7648 15.5951 33.765 15.5948C33.7651 15.5947 33.7652 15.5947 33.7652 15.5946C34.4411 14.9364 34.6675 13.964 34.385 13.0844C34.1006 12.1873 33.3203 11.541 32.403 11.4077Z"
				fill="currentColor"
				stroke="white"
				strokeWidth="2.48835"
			/>
		</svg>
	);

	const handleClick = (index: number) => {
		if (!disabled && !viewOnly) {
			setCurrentRating(index);
			if (onRate) {
				onRate(index);
			}
		}
	};

	return (
		<div className="flex">
			{Array.from({ length: 5 }, (_, index) => (
				<button
					key={index}
					className="appearance-none disabled:opacity-50"
					type="button"
					aria-label={`Star ${index + 1} out of 5`}
					disabled={disabled}
					onClick={() => handleClick(index + 1)}
				>
					<StarSVG filled={index + 1 <= currentRating} />
				</button>
			))}
		</div>
	);
};

export default Stars;
