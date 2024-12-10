import { RandomAvatar } from "react-random-avatars";

export const ChatFeed = ({
	// 전송 시간
	time,
	// 사용자 이름
	username,
	// 이미지 URL
	avatar,
	// 메시지 내용
	message,
	// 이거 나야? 여부
	isMe,
}) => {
	return (
		<>
			<div
				className={`flex flex-row w-full ${isMe ? "justify-end" : "justify-start"} px-2`}
			>
				<div className="flex items-start gap-2.5">
					<RandomAvatar name={username} mode="random" />
					<div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
						<div className="flex items-center space-x-2">
							<span className="text-sm font-semibold text-gray-900 dark:text-white">
								{username}
							</span>
							<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
								{time.getHours()}:{time.getMinutes()}
							</span>
						</div>
						<p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
							{message}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
