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
                    {selectedChat.inquiry_id && selectedChat.inquiry_id.customer !== user._id && (
                        <button type="button" className='custom-offer' data-toggle="modal" data-target="#CustomOfferModal">Custom Offfer</button>
                    )}
                    
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
                    {selectedChat.inquiry_id && selectedChat.inquiry_id.customer !== user._id && (
                        <button type="button" className='custom-offer' data-toggle="modal" data-target="#CustomOfferModal">Custom Offfer</button>
                    )}
                    {/* <i className="fa fa-star"> Custom Offer</i> */}
                </div>
            )}
            {/* <!-- end chat-header --> */}
            {selectedChat.inquiry_id && selectedChat.inquiry_id.customer === user._id && (
            <div style={{ backgroundColor: 'white', position: 'absolute', width: '58vw', height: '10vh', alignItems: 'center', display: 'flex', padding: '20px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className='fas fa-tag' style={{ fontSize: '50px', width: '50px', height: '50px', margin: '20px' }}></i>
                    <p>Freelancer made an offer with the price at ₱{ }, would you like to proceed?</p>
                </div>
                {/* buttons */}
                <div style={{ float: "right" }}>
                    {/* <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }}>Accept</a>
                    <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }} >Refuse</a> */}
                    <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }}>Check Details</a>
                </div>
            </div>
            )}
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


            {/* CUSTOM OFFER MODAL */}
            <Fragment>
                <div className="modal fade" id="CustomOfferModal" tabIndex="-1" role="dialog" aria-labelledby="CustomOfferModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '800px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="CustomOfferModalTitle">Custom Offer</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form className="a" encType='multipart/form-data' >
                                {/* {loadings ? <Loader /> : ( */}
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label>Description: </label>
                                        <textarea
                                            name="description"
                                            id="description" className="form-control mt-3"
                                            style={{ minHeight: '200px' }}
                                            placeholder='what you should do?'
                                        // value={description}
                                        // onChange={(e) => setDescription(e.target.value)}
                                        >
                                        </textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="stock_field">Price</label>
                                        <input
                                            type="number"
                                            id="stock_field"
                                            className="form-control"
                                        // value={stock}
                                        // onChange={(e) => setStock(e.target.value)}
                                        />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="stock_field">Expected Date Finished</label>
                                        <input
                                            type="date"
                                            id="stock_field"
                                            className="form-control"
                                        // value={stock}
                                        // onChange={(e) => setStock(e.target.value)}
                                        />
                                    </div>







                                </div>
                                {/* )} */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" >Submit</button>


                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </Fragment>

        </Fragment>

    )
}

export default SingleChat