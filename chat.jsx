import { useEffect, useState } from "react";
import axios from "axios";
import { ChatFeed } from "../components/ChatFeed";

function Chat() {
	const [openModal, setOpenModal] = useState(false);
	const [messageInput, setMessageInput] = useState("");

	const [chatRoomData, setChatRoomData] = useState([]);

	const handleMessageInput = (e) => {
		setMessageInput(e.target.value);
	};

	const handleMessageClick = async () => {
		try {
			const chatRoomId = "test";

			const response = await axios.post(
				`http://localhost:4000/message/${chatRoomId}`,
				{
					message: messageInput,
				},
			);

			const isOk = response.status === 200;

			if (isOk === true) console.log("성공");
			else console.log("실패");
		} catch (error) {
			console.error("채팅 보내는 중 에러 발생:", error);
		}
	};

	const fetchChatHistory = async (roomId) => {
		const response = await axios(`http://localhost:4000/messages/${roomId}`);
		const isOk = response.status === 200;

		if (!isOk) {
			console.debug("채팅 데이터 로딩 실패");
			return;
		}

		setChatRoomData(response.data);
	};

	useEffect(() => {
		const chatRoomId = "test";
		fetchChatHistory(chatRoomId);
	}, []);

	return (
		<form
			className="flex flex-col pt-2 gap-2 align-bottom"
			onSubmit={(ev) => {
				// 제출 버튼 클릭에 대한 창 새로고침 방지
				ev.preventDefault();
				ev.stopPropagation();

				fetchChatHistory("test");

				return false;
			}}
		>
			{(chatRoomData.messages ?? []).map((_message, index) => {
				const { username, date, message } = _message;
				
				// TODO: 채팅창에서 채팅 보낼 때 사용자 이름 함께 보내도록 변경
				// TODO: isMe 반영 가능하도록 코드 수정
				return (
					<>
						<ChatFeed
							key={`chat-feed-${index}`}
							time={new Date(date)}
							username={username || "unknown"}
							message={message}
							avatar={""}
							isMe={false}
						/>
					</>
				);
			})}

			<div className="relative bottom-0 w-full">
				<input
					type="input"
					className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
					placeholder="입력"
					onChange={handleMessageInput}
					required
				/>
				<p>{messageInput}</p>
				<button
					type="submit"
					className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={handleMessageClick}
				>
					보내기
				</button>
			</div>
		</form>
	);
}
export default Chat;
