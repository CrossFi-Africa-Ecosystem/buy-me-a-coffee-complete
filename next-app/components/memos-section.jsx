import { ethers, formatEther } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { Coffee, Link as LinkIcon, FileText } from "lucide-react";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/contract";
import toast from "react-hot-toast";
import { provider } from "@/constants/readOnlyProvider";

const MemosSection = () => {
	const [memos, setMemos] = useState([]);
	const [loading, setLoading] = useState(true);
	const memoAdded = useCallback((from, timestamp, name, amount, message) => {
		setMemos((prevMemos) => [
			{
				address: from,
				name,
				message,
				amount: Number(formatEther(amount)).toFixed(4),
				timestamp: new Date(Number(timestamp) * 1000).toLocaleDateString(),
			},
			...prevMemos,
		]);
	}, []);

	useEffect(() => {
		const contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			CONTRACT_ABI,
			provider
		);
		contract.on("NewMemo", memoAdded);
		return () => {
			contract.off("NewMemo", memoAdded);
		};
	}, [memoAdded]);

	useEffect(() => {
		const getMemos = async () => {
			try {
				const contract = new ethers.Contract(
					CONTRACT_ADDRESS,
					CONTRACT_ABI,
					provider
				);
				const memos = await contract.getMemos();
				const formattedMemos = memos
					.map((memo) => ({
						address: memo.from,
						name: memo.name,
						message: memo.message,
						amount: Number(formatEther(memo.amount)).toFixed(4),
						timestamp: new Date(
							Number(memo.timestamp) * 1000
						).toLocaleDateString(),
					}))
					.reverse();

				console.log({ formattedMemos });
				setMemos(formattedMemos);
			} catch (error) {
				console.log(error);
				toast.error("Error fetching memos");
			} finally {
				setLoading(false);
			}
		};
		getMemos();
		// setMemos(MOCK_MEMOS);
	}, []);

	const generateAvatar = (seed) => {
		return createAvatar(personas, {
			seed,
			scale: 90,
			radius: 50,
			backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
		}).toDataUri();
	};

	return (
		<section>
			<div className="flex items-center gap-3 mb-6">
				<FileText className="w-7 h-7 text-orange-500" />
				<h2 className="text-2xl font-semibold text-gray-800">Recent Memos</h2>
			</div>
			{!loading && memos.length === 0 ? (
				<p className="text-gray-500">No memos found</p>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{memos?.map((memo, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-all duration-300 border-2 border-orange-50"
						>
							<CardContent className="p-6 space-y-4">
								<div className="flex items-center gap-4">
									<Image
										src={generateAvatar(memo.address)}
										alt={memo.name}
										width={60}
										height={60}
										className="rounded-full"
									/>
									<div>
										<h3 className="font-semibold text-gray-800">{memo.name}</h3>
										<div className="text-sm text-gray-500 flex items-center gap-1">
											<LinkIcon className="w-4 h-4" />
											{memo.address.slice(0, 6)}...
											{memo.address.slice(-4)}
										</div>
									</div>
								</div>
								<p className="text-gray-600 italic">
									&quot;{memo.message}&quot;
								</p>
								<div className="flex justify-between items-center">
									<span className="text-sm text-gray-500">
										{memo.timestamp}
									</span>
									<div className="flex items-center gap-1 text-orange-500">
										<Coffee className="w-4 h-4" />
										<span className="font-semibold">{memo.amount} XFI</span>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</section>
	);
};

export default MemosSection;
