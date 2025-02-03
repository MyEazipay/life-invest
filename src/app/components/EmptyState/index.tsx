import React from "react";

interface EmptyStateProps {
	text?: string;
}
export default function EmptyState({ text }: EmptyStateProps) {
	return (
		<div className="w-full h-full flex items-center justify-center flex-col gap-5">
			<svg
				width="187"
				height="150"
				viewBox="0 0 187 150"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0C33.5786 0 0 33.5786 0 75C0 116.421 33.5786 150 75 150Z"
					fill="url(#paint0_linear_1_766)"
				/>
				<g filter="url(#filter0_d_1_766)">
					<path
						d="M41 34H176C177.326 34 178.598 34.5268 179.536 35.4645C180.473 36.4021 181 37.6739 181 39V64C181 65.3261 180.473 66.5979 179.536 67.5355C178.598 68.4732 177.326 69 176 69H41C39.6739 69 38.4021 68.4732 37.4645 67.5355C36.5268 66.5979 36 65.3261 36 64V39C36 37.6739 36.5268 36.4021 37.4645 35.4645C38.4021 34.5268 39.6739 34 41 34V34Z"
						fill="white"
					/>
				</g>
				<path
					d="M105 42H79C77.3431 42 76 43.3431 76 45C76 46.6569 77.3431 48 79 48H105C106.657 48 108 46.6569 108 45C108 43.3431 106.657 42 105 42Z"
					fill="#B4DAFF"
				/>
				<path
					d="M123 55H79C77.3431 55 76 56.3431 76 58C76 59.6569 77.3431 61 79 61H123C124.657 61 126 59.6569 126 58C126 56.3431 124.657 55 123 55Z"
					fill="#DEE9FC"
				/>
				<path
					d="M68 51.5C68 43.4919 61.5081 37 53.5 37C45.4919 37 39 43.4919 39 51.5C39 59.5081 45.4919 66 53.5 66C61.5081 66 68 59.5081 68 51.5Z"
					fill="#1485FD"
				/>
				<path
					d="M52.6 56.194C53.8413 56.1938 55.0469 55.7785 56.025 55.014L59.1 58.089L60.089 57.1L57.013 54.024C57.7858 53.0248 58.1974 51.7933 58.1807 50.5303C58.1641 49.2672 57.7201 48.047 56.9212 47.0685C56.1223 46.0901 55.0155 45.4111 53.7813 45.1422C52.547 44.8732 51.2581 45.0303 50.1245 45.5877C48.991 46.1451 48.0796 47.07 47.539 48.2116C46.9984 49.3533 46.8604 50.6444 47.1475 51.8745C47.4346 53.1046 48.1299 54.2013 49.12 54.9857C50.1102 55.7701 51.3368 56.196 52.6 56.194ZM52.6 46.4C53.4306 46.4 54.2427 46.6463 54.9334 47.1078C55.624 47.5693 56.1624 48.2253 56.4803 48.9927C56.7981 49.7602 56.8813 50.6047 56.7193 51.4194C56.5572 52.2341 56.1572 52.9825 55.5698 53.5699C54.9824 54.1572 54.2341 54.5572 53.4193 54.7193C52.6046 54.8814 51.7601 54.7982 50.9927 54.4803C50.2252 54.1624 49.5693 53.6241 49.1078 52.9334C48.6463 52.2427 48.4 51.4307 48.4 50.6C48.4 49.4861 48.8425 48.4178 49.6301 47.6302C50.4178 46.8425 51.4861 46.4 52.6 46.4Z"
					fill="white"
				/>
				<g filter="url(#filter1_d_1_766)">
					<path
						d="M161 79H26C23.2386 79 21 81.2386 21 84V109C21 111.761 23.2386 114 26 114H161C163.761 114 166 111.761 166 109V84C166 81.2386 163.761 79 161 79Z"
						fill="white"
					/>
				</g>
				<path
					d="M90 87H64C62.3431 87 61 88.3431 61 90C61 91.6569 62.3431 93 64 93H90C91.6569 93 93 91.6569 93 90C93 88.3431 91.6569 87 90 87Z"
					fill="#B4DAFF"
				/>
				<path
					d="M108 100H64C62.3431 100 61 101.343 61 103C61 104.657 62.3431 106 64 106H108C109.657 106 111 104.657 111 103C111 101.343 109.657 100 108 100Z"
					fill="#DEE9FC"
				/>
				<path
					d="M53 96.5C53 88.4919 46.5081 82 38.5 82C30.4919 82 24 88.4919 24 96.5C24 104.508 30.4919 111 38.5 111C46.5081 111 53 104.508 53 96.5Z"
					fill="#1485FD"
				/>
				<path
					d="M37.6 101.194C38.8413 101.194 40.0469 100.778 41.025 100.014L44.1 103.089L45.089 102.1L42.013 99.024C42.7858 98.0248 43.1974 96.7933 43.1807 95.5303C43.1641 94.2672 42.7201 93.047 41.9212 92.0685C41.1223 91.0901 40.0155 90.4111 38.7813 90.1422C37.547 89.8732 36.2581 90.0303 35.1245 90.5877C33.991 91.1451 33.0796 92.07 32.539 93.2116C31.9984 94.3533 31.8604 95.6444 32.1475 96.8745C32.4346 98.1046 33.1299 99.2013 34.12 99.9857C35.1102 100.77 36.3368 101.196 37.6 101.194ZM37.6 91.4C38.4306 91.4 39.2427 91.6463 39.9334 92.1078C40.624 92.5693 41.1624 93.2253 41.4803 93.9927C41.7981 94.7602 41.8813 95.6047 41.7193 96.4194C41.5572 97.2341 41.1572 97.9825 40.5698 98.5699C39.9824 99.1572 39.2341 99.5572 38.4193 99.7193C37.6046 99.8814 36.7601 99.7982 35.9927 99.4803C35.2252 99.1624 34.5693 98.6241 34.1078 97.9334C33.6463 97.2427 33.4 96.4307 33.4 95.6C33.4 94.4861 33.8425 93.4178 34.6301 92.6302C35.4178 91.8425 36.4861 91.4 37.6 91.4Z"
					fill="white"
				/>
				<defs>
					<filter
						id="filter0_d_1_766"
						x="30"
						y="31"
						width="157"
						height="47"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="3" />
						<feGaussianBlur stdDeviation="3" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_1_766"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_1_766"
							result="shape"
						/>
					</filter>
					<filter
						id="filter1_d_1_766"
						x="15"
						y="76"
						width="157"
						height="47"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="3" />
						<feGaussianBlur stdDeviation="3" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_1_766"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_1_766"
							result="shape"
						/>
					</filter>
					<linearGradient
						id="paint0_linear_1_766"
						x1="75"
						y1="0"
						x2="75"
						y2="150"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#E3ECFA" />
						<stop offset="1" stopColor="#DAE7FF" />
					</linearGradient>
				</defs>
			</svg>
			<span className="font-[600] text-gray-400">{text}</span>
		</div>
	);
}
