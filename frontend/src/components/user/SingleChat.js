import React, { Fragment, useState, useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import {
    useSelector
    , useDispatch
} from 'react-redux'
import axios from "axios";
import { getMessages, addMessage } from '../../actions/messageActions'
import Loader from '../layout/Loader'
import { Form } from 'react-bootstrap'
import { event } from 'jquery'
import ScrollableChat from './ScrollableChat'
import Lottie from "react-lottie"
import animationData from "../../animations/typing.json"


import io from 'socket.io-client'
const ENDPOINT = "http://localhost:4002";
var socket, selectedChatCompare;



const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const dispatch = useDispatch();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };



    const { selectedChat, setSelectedChat, notification, setNotification } = ChatState();
    const { user } = useSelector(state => state.auth)
    // const { messages, loading } = useSelector(state => state.messages)

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState([]);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false)
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on('connected', () => setSocketConnected(true));
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    }, []);

    useEffect(() => {

        fetchMessages();

        selectedChatCompare = selectedChat;

    }, [selectedChat, fetchAgain]);




    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (!selectedChatCompare ||
                selectedChatCompare._id !== newMessageReceived.chat._id) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
                //give notification
            } else {
                // setFetchAgain(!fetchAgain);
                setMessages([...messages, newMessageReceived]);
            }
        })
    })
    // useEffect(() => {
    //     socket.on('message received', (newMessageReceived) => {
    //         if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
    //             //give notification
    //         } else {
    //             setMessages([...messages, newMessageReceived]);
    //         }
    //     });
    // })

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);


            const { data } = await axios.get(
                // `/api/v1/messages/${id}`
                `/api/v1/messages/${selectedChat._id}`
                ,
                // config
            );
            setMessages(data);
            // console.log(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);

        } catch (error) {
            console.log(error)
        }
        // dispatch(getMessages(selectedChat._id));
        // console.log(messages)

        // socket.emit('join chat', selectedChat._id);
    }

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            event.preventDefault()
            socket.emit('stop typing', selectedChat._id);

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        // Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "/api/v1/message/new",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                socket.emit("new message", data);
                setMessages([...messages, data]);
                setFetchAgain(!fetchAgain);
            } catch (error) {
                console.log(error)

            }
        }

    };

    // TO DO
    const sendMessageViaButton = async (event) => {

        // const messageData = new FormData();


        // messageData.set('content', newMessage);
        // messageData.set('chatId', selectedChat._id);
        // // console.log(event)
        // if (newMessage) {
        //     event.preventDefault();
        //     // dispatch(newOffer(offerData));\
        //     // console.log(newMessage)
        //     setNewMessage("");

        //     dispatch(addMessage(messageData));
        //     socket.emit("new message", data);
        //     setMessages([...messages, data]);
        //     // return false;

        // }
        // else {
        //     return false;
        // }
        if (newMessage) {
            event.preventDefault()
            socket.emit('stop typing', selectedChat._id);

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        // Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "/api/v1/message/new",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                socket.emit("new message", data);
                setMessages([...messages, data]);
                setFetchAgain(!fetchAgain);
            } catch (error) {
                console.log(error)

            }


        };

    }

    const typingHandler = (e) => {
        // console.log(newMessage)
        setNewMessage(e.target.value);

        //Typing Indicator Logic
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true)
            socket.emit('typing', selectedChat._id);
        }
        let lastTypingTime = new Date().getTime()
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id)
                setTyping(false);
            }
        }, timerLength)
    };

    return (
        <Fragment>
            {selectedChat.users[0]._id === user._id && (
                <div className="chat-header clearfix">
                    <figure className='avatar' style={{ float: 'left', outline: 'solid rgb(96, 96,96)' }}>

                        <img
                            src={selectedChat.users[1].avatar.url}
                            className='rounded-circle'
                            alt="avatar" />
                    </figure>

                    <div className="chat-about">
                        <div className="chat-with">{selectedChat.users[1].name}</div>
                        {/* <div className="chat-num-messages">already 1 902 messages</div> */}
                    </div>
                    {/* <i className="fa fa-star"></i> */}
                </div>
            )}
            {selectedChat.users[1]._id === user._id && (
                <div className="chat-header clearfix">
                    <figure className='avatar' style={{ float: 'left', outline: 'solid rgb(96, 96,96)' }}>

                        <img
                            src={selectedChat.users[0].avatar.url}
                            className='rounded-circle'
                            alt="avatar" />
                    </figure>

                    <div className="chat-about">
                        <div className="chat-with">{selectedChat.users[0].name}</div>
                        {/* <div className="chat-num-messages">already 1 902 messages</div> */}
                    </div>
                    {/* <i className="fa fa-star"></i> */}
                </div>
            )}
            {/* <!-- end chat-header --> */}

            <div className="chat-history">
                {messages ? (<div>
                    <ScrollableChat messages={messages} />
                </div>) : (<Loader />)}
                {/* {loading ? <Loader /> : (
                    

                )} */}
                {istyping ? <div>
                    <Lottie
                        options={defaultOptions}
                        width={70}
                        style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                </div> : (<></>)}
            </div>
            {/* <!-- end chat-history --> */}

            <div className="chat-message clearfix" style={{ display: 'flex' }}>

                <form onKeyDown={sendMessage} onSubmit={sendMessageViaButton} style={{ width: '100%', display: 'flex' }}>

                    <input placeholder="Type your message" rows="3"
                        onChange={typingHandler}
                        value={newMessage}

                    ></input>

                    {/* <i className="fa fa-file-o"></i>  */}
                    &nbsp;&nbsp;&nbsp;
                    {/* <i className="fa fa-file-image-o"></i> */}

                    <button type='submit'>Send</button>
                </form>
            </div>
        </Fragment>

    )
}

export default SingleChat