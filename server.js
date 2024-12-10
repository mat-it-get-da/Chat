// @ts-check

/**
 * @typedef {object} User
 * @property {string} name
 */

/**
 * @typedef {object} Message
 * @property {string} username
 * @property {string} date
 * @property {string} message
 */

/**
 * @typedef {object} ChatRoom
 * @property {string} roomName
 * @property {string} [id]
 * @property {User[]} userList
 * @property {Message[]} messages
 */

const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ?? 4000;
const messagedata = [{ username: "test", message_input: "test" }];

/**
 * 사용자 배열
 *
 * @type {User[]}
 */
let users = [
    {
        name: "test",
    },
];
/**
 * 채팅방 배열
 *
 * @type {ChatRoom[]}
 */
let chatRooms = [
    {
        roomName: "test",
        messages: [],
        userList: [],
        id: "test",
    },
];

// 이름 유무 체크
app.get("/userlist/:name", (req, res) => {
    const name = req.params.name;
    const namecheck = users.some((user) => user.name === name);

    const statusCode = namecheck
        ? // 유효한 이름인 경우 (OK)
          200
        : // 없는 이름인 경우 (BAD_REQUEST)
          400;

    const message = namecheck
        ? `${name}이(가) 서버 내에 존재합니다.`
        : `${name}이(가) 서버 내에 존재하지 않습니다.`;

    // 이름 사용 가능 여부
    res.status(statusCode).send({
        ok: namecheck,
        message,
    });
    // 이름 업데이트코드
});

// 채팅방 링크 생성
// app.put("/chatroom/:link", (req, res) => {
//    const chatroom = req.params.link;
//    const chatroom_link = `${req.protocol}://${req.get("host")}/chat/${chatroom}`;
//    //const linkExists = users.some((user) => user.link === chatroom);
//    res.send("링크 생성 요청");
// });

//----------------------------------------------------------------------------------
//챗방 링크 생성 2트
app.post("/chatroom/:name", (req, res) => {
    // 사용자 이름 가져오기
    const name = req.params.name;

    // 사용자 이름 유무 체크
    const userCheck = users.find((user) => user.name === name);

    const { protocol, hostname } = req;
    const link = `${protocol}://${hostname}/link/${v4()}`;

    // 결과 생성
    const statusCode = userCheck
        ? // 유효한 이름인 경우 (이건 안되는 이름이야 이미 있어)
          400
        : // 유효하지 않으면 ok
          200;

    const message = userCheck
        ? `${name}이 이미 있는 이름입니다.`
        : `${name}으로 채팅을 시작합니다.`;

    // TODO: 이거 확인해.
    res.status(statusCode).json({
        message,
        link,
    });
});

// 사용자 이름 바꾸기 (원래 이름 -> 새로운 이름)
app.get("/changename/:oldName/:newName", (req, res) => {
    const { oldName, newName } = req.params;

    // 사용자 배열에서 사용자 이름 위치 찾기 (없으면 -1, 있으면 0 이상의 실제 인덱스)
    const userIndex = users.findIndex((user) => user.name === oldName);

    if (userIndex < 0)
        res.status(400).json({
            message: `"${oldName}"는(은) 존재하지 않은 사용자 이름입니다`,
        });

    // 이름 변경
    users[userIndex].name = newName;

    res.json({
        message: `사용자 이름을 "${oldName}"에서 "${users[userIndex].name}"으로 변경하였습니다.`,
    });

    // const user = users.find((user) => user.name === name);

    // // 이름 존재 여부
    // const hasUser = Boolean(user);

    // res.json({
    //     ok: hasUser,
    // });
});

// 메세지 전송
app.post("/message/:id", (req, res) => {
    // 채팅방 이름 가져오기
    const roomName = req.params.id;

    // 메시지 가져오기
    const message = req.body.message;

    // 채팅방 이름 유무
    const chatRoomIndex = chatRooms.findIndex(
        (chatRoom) => chatRoom.roomName === roomName
    );

    // 오류 처리:
    if (chatRoomIndex < 0)
        res.status(404).json({
            message: "해당 채팅방이 존재하지 않습니다.",
        });
    // 메시지 검증
    if (!(typeof message === "string"))
        res.status(400).json({
            message: "메시지 입력으로 문자열이 아닌 데이터가 입력되었습니다.",
        });
    if (message.trim().length === 0)
        res.status(400).json({
            message: "빈 메시지를 입력하셨습니다.",
        });

    // 해당 채팅방의 메시지 배열에 메시지 추가
    chatRooms[chatRoomIndex].messages = [
        ...chatRooms[chatRoomIndex].messages,
        {
            // TODO: 사용자 이름 넣어라.
            username: "",
            message,
            date: new Date().toISOString(),
        },
    ];

    // 채팅방 검증
    res.status(200).json({
        message: "메시지가 성공적으로 전송되었습니다.",
    });
});
// //챗 전송
// app.put("/message/:username/:message_input", (req, res) => {
//     const username = req.params.username;
//     const message_input = req.params.message_input;

//     const messages = messagedata.find(
//         (messages) => messages.username === username
//     );

//     if (messages) {
//         res.send({ ok: true });
//     } else {
//         res.send({ ok: false });
//     }
// });

// 메시지 로그 호출
app.get("/messages/:roomName", (req, res) => {
    const { roomName } = req.params;

    const room = chatRooms.find((room) => room.roomName === roomName);

    if (room === undefined) res.status(400).json(room);
    else res.status(200).json(room);
});

app.get("/chat-feed", (req, res) => {
    res.status(200).json({
        message: "Hello World!",
    });
});

app.get("*", (req, res) => {
    res.status(404).send("잘못된 경로입니다.");
});

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});
