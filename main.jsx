import { Label, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import axios from "axios";
import { $username } from "../store/user";
import { $newChatLink } from "../store/new-chat-link";
import toast from "react-hot-toast";

function Main() {
	const [newChatLink, setNewChatLink] = useRecoilState($newChatLink);
	// biome-ignore lint/correctness/useExhaustiveDependencies: onMount 이벤트 수행할거라서 비워둠.

	useEffect(() => {
		// TODO: 실제 채팅방 링크를 받을 수 있도록 백엔드 짜고나서 코드 업데이트하기
		if ($username === "") {
			setNewChatLink("");
		} else {
			const response = axios.post(
				setNewChatLink(`http://${$username}/link/${v4()}`),
			);
		}
	}, []);

	return (
		<>
			<div className="flex flex-col gap-2 items-center h-full justify-center">
				<div className="grid grid-cols-[2fr,1fr] gap-2">
					<Label
						className="col-span-2"
						htmlFor="email"
						value="초대하고싶은 친구에게 보내는 링크"
					/>
					<TextInput
						id="email"
						type="email"
						placeholder=""
						s
						className="w-fit"
						value={newChatLink}
						readOnly
						shadow
					/>
					<Button>Copy</Button>

					<Label
						className="col-span-2"
						htmlFor="link"
						valu99e="초대 링크 입력"
					/>
					<TextInput id="link" type="email" placeholder="" required />
					<Button
						onClick={(ev) => {
							// TODO: 회원 정보 있나 검증하는 코드
							toast.error("프로필 설정");
						}}
					>
						확인
					</Button>
				</div>
			</div>
		</>
	);
}

export default Main;
