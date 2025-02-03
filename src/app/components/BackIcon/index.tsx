"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBackIos } from "react-icons/md";

export default function BackIcon() {
	const router = useRouter();
	return (
		<span
			onClick={router.back}
			className="w-[48px] h-[48px] rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
		>
			<MdArrowBackIos />
		</span>
	);
}
