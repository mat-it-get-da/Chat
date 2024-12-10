import React, { useEffect, useState } from "react";
import {
	Avatar,
	Breadcrumb,
	Button,
	FloatingLabel,
	Modal,
} from "flowbite-react";
import { useRecoilState } from "recoil";
import axios from "axios";

import { $username } from "../store/user";
const Header = () => {
	const [openModal, setOpenModal] = useState(false);
	const [username, setUsername] = useRecoilState($username);

	return (
		<div>
			<Breadcrumb
				aria-label="Solid background breadcrumb example"
				className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
			>
				<div className="flex flex-wrap gap-2">
					<Avatar img="" alt={username} title={username} rounded />
					<Button onClick={() => setOpenModal(true)}>프로필 설정</Button>
				</div>

				<Modal show={openModal} onClose={() => setOpenModal(false)}>
					<Modal.Header>프로필 설정</Modal.Header>
					<Modal.Body>
						<div className="flex flex-wrap gap-2">
							<Avatar rounded />
						</div>
						<div className="space-y-6">
							<div className="grid grid-flow-col justify-stretch space-x-4">
								<FloatingLabel
									variant="standard"
									label="이름"
									value={username}
								/>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								if (username === "") {
									setOpenModal(false);
								} else {
									axios.get(`http://localhost:4000/userlist/${username}`)
									.then((res)=>{})
								}
							}}
						>
							확인
						</Button>
						<Button color="gray" onClick={() => setOpenModal(false)}>
							취소
						</Button>
					</Modal.Footer>
				</Modal>
			</Breadcrumb>
		</div>
	);
};

export default Header;
