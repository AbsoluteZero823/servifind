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
import $ from 'jquery';
import Lottie from "react-lottie"
import animationData from "../../animations/typing.json"
import { newOffer, getOffers } from '../../actions/offerActions';
import { newTransaction } from '../../actions/transactionActions';
import { NEW_OFFER_RESET } from '../../constants/offerConstants';
import moment from 'moment/moment'

import io from 'socket.io-client'
import Swal from 'sweetalert2';
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
    const { offer, success } = useSelector(state => state.addOffer)
    const { offers } = useSelector(state => state.offers)
    // const { messages, loading } = useSelector(state => state.messages)

    const [expectedDate, setExpectedDate] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [messages, setMessages] = useState([]);
    const [hide, setHide] = useState(false)
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
        dispatch(getOffers());
        // setLoading(true)
        selectedChatCompare = selectedChat;


        if (success) {
            const formData = new FormData();
            formData.set('offer_id', offer._id);
            formData.set('price', price);
            formData.set('expected_Date', expectedDate)
            formData.set('inquiry_id', selectedChat.inquiry_id._id);
            dispatch(newTransaction(formData));
            $('.close').click();
            Swal.fire(
                'Offer sent Successfully!',
                '',
                'success'
            )
            dispatch({ type: NEW_OFFER_RESET });
        }

    }, [fetchAgain, success]);

    useEffect(() => {
        fetchMessages();
        dispatch(getOffers());
        setLoading(true)
    }, [selectedChat])


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

            // setLoading(true);


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


    const sendMessageViaButton = async (event) => {


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

    const submitHandler = (e) => {
        e.preventDefault();
        const offerData = new FormData();


        offerData.set('service_id', selectedChat.inquiry_id.service_id);
        offerData.set('description', description);
        offerData.set('offered_by', user._id);

        offerData.set('inquiry_id', selectedChat.inquiry_id._id);

        dispatch(newOffer(offerData));


        // To Do: Create Transaction

    }

    const OfferExists = offers.filter(function (o) {
        // return ftransaction.inquiry_id.freelancer.user_id._id === user._id;

        if (o.inquiry_id) {
            if (selectedChat.inquiry_id) {
                return o.inquiry_id === selectedChat.inquiry_id._id;
            }


        }

        // else if (ftransaction.offer_id) {
        //     return ftransaction.offer_id.offered_by === user._id;
        // }

    });

    OfferExists.forEach(o => {
        console.log(o)
    })


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
                    {loading ? <></> : (
                        <Fragment>
                            {!OfferExists[0] && selectedChat.inquiry_id && selectedChat.inquiry_id.customer !== user._id && (
                                <button type="button" className='custom-offer' data-toggle="modal" data-target="#CustomOfferModal">Custom Offfer</button>
                            )}
                            {OfferExists[0] && OfferExists[0].inquiry_id === selectedChat.inquiry_id._id && selectedChat.inquiry_id && selectedChat.inquiry_id.customer !== user._id && (
                                <button type="button" className='custom-offer' data-toggle="modal" data-target="#CheckOfferModal">Check Offer</button>
                            )}
                        </Fragment>
                    )}

                    {selectedChat.inquiry_id && selectedChat.inquiry_id.customer === user._id && OfferExists[0] && OfferExists[0].inquiry_id === selectedChat.inquiry_id._id && (
                        <div style={{ float: "right", paddingTop: 20 }}>
                            <a style={{ padding: 10, color: 'black', fontWeight: 'bold' }} onClick={() => setHide(!hide)} >Offer <i className='fa fa-caret-down'></i> </a>
                        </div>

                    )}






                    {/* <i className="fa fa-star"></i> */}
                </div>
            )
            }
            {
                selectedChat.users[1]._id === user._id && (
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

                        {loading ? <></> : (
                            <Fragment>
                                {!OfferExists[0] && selectedChat.inquiry_id && selectedChat.inquiry_id.customer !== user._id && (
                                    <button type="button" className='custom-offer' data-toggle="modal" data-target="#CustomOfferModal">Custom Offfer</button>
                                )}
                                {OfferExists[0] && OfferExists[0].inquiry_id === selectedChat.inquiry_id._id && selectedChat.inquiry_id && selectedChat.inquiry_id.customer !== user._id && (
                                    <button type="button" className='custom-offer' data-toggle="modal" data-target="#CheckOfferModal">Check Offfer</button>
                                )}
                            </Fragment>
                        )}


                        {/* <i className="fa fa-star"> Custom Offer</i> */}
                    </div>
                )
            }
            {/* <!-- end chat-header --> */}
            {
                selectedChat.inquiry_id && selectedChat.inquiry_id.customer === user._id && OfferExists[0] && OfferExists[0].inquiry_id === selectedChat.inquiry_id._id && (

                    <Fragment>
                        {!hide && (
                            <div style={{ backgroundColor: 'white', position: 'absolute', width: '58vw', height: '10vh', alignItems: 'center', display: 'flex', padding: '20px', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <i className='fas fa-tag' style={{ fontSize: '50px', width: '50px', height: '50px', margin: '20px' }}></i>
                                    <p>Freelancer made an offer with the price at ₱{OfferExists[0].transaction[0].price}, would you like to proceed?</p>
                                </div>
                                {/* buttons */}
                                <div style={{ float: "right" }}>
                                    {/* <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }}>Accept</a>
                    <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }} >Refuse</a> */}
                                    <a style={{ padding: 10, color: 'teal', fontWeight: 'bold' }} data-toggle="modal" data-target='#CheckOfferModal'>Check Details</a>
                                    {/* <a style={{ padding: 10, color: 'purple', fontWeight: 'bold' }} >Hide</a> */}
                                </div>
                            </div>
                        )}

                    </Fragment>
                )
            }
            <div className="chat-history">
                {loading ? <Loader /> : (


                    <Fragment>
                        {messages ? (<div>
                            <ScrollableChat messages={messages} />
                        </div>) : (<Loader />)}
                    </Fragment>
                )}
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
                            <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >
                                {/* {loadings ? <Loader /> : ( */}
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label>Description: </label>
                                        <textarea
                                            name="description"
                                            id="description" className="form-control mt-3"
                                            style={{ minHeight: '200px' }}
                                            placeholder='what you should do?'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        >
                                        </textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="stock_field">Price</label>
                                        <input
                                            type="number"
                                            id="stock_field"
                                            className="form-control"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="stock_field">Expected Date Finished</label>
                                        <input
                                            type="date"
                                            id="stock_field"
                                            className="form-control"
                                            value={expectedDate}
                                            onChange={(e) => setExpectedDate(e.target.value)}
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

            {/* CHECK OFFER MODAL */}
            <Fragment>
                <div className="modal fade" id="CheckOfferModal" tabIndex="-1" role="dialog" aria-labelledby="CheckOfferModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '800px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="CheckOfferModalTitle">Freelancer Offer</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>


                            {/* {loadings ? <Loader /> : ( */}
                            <div className="modal-body">



                                {/* <div className='center'>
                                    <figure className='profile-pic mr-3 item-rtl'>
                                        <img
                                            src={user.avatar.url}
                                            className='rounded-circle'
                                            id='profile-pic'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div> */}

                                <h5 style={{ color: "red" }} >Offer Details</h5>
                                <div className='room'>
                                    {OfferExists[0] && (
                                        <div className='contents'>
                                            <label htmlFor="email_field">Description: {OfferExists[0].description}</label>
                                            <label htmlFor="email_field">Price: ₱{OfferExists[0].transaction[0].price}</label>
                                            <label htmlFor="email_field">Expected Date to be Finished: {moment(OfferExists[0].transaction[0].expected_Date).format('MMM/DD/yy')}</label>

                                        </div>
                                    )}

                                </div>




                            </div>
                            {/* )} */}
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" className="btn btn-primary" >Accept</button>
                                <button type="submit" className="btn btn-danger" >Reject</button>

                            </div>


                        </div>
                    </div>
                </div>
            </Fragment>

            {/* CHECK MY OFFER MODAL */}
            <Fragment>
                <div className="modal fade" id="CheckMyOfferModal" tabIndex="-1" role="dialog" aria-labelledby="CheckOfferModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '800px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="CheckOfferModalTitle">Freelancer Offer</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className='center'>
                                <figure className='profile-pic mr-3 item-rtl'>
                                    <img
                                        src={user.avatar.url}
                                        className='rounded-circle'
                                        id='profile-pic'
                                        alt='Avatar Preview'
                                    />
                                </figure>
                            </div>

                            <h5 style={{ color: "red" }} >Offer Details</h5>
                            <div className='room'>
                                {OfferExists[0] && (
                                    <div className='contents'>
                                        <label htmlFor="email_field">Description: {OfferExists[0].description}</label>
                                        <label htmlFor="email_field">Price: ₱{OfferExists[0].transaction[0].price}</label>
                                        <label htmlFor="email_field">Expected Date to be Finished: {moment(OfferExists[0].transaction[0].expected_Date).format('MMM/DD/yy')}</label>

                                    </div>
                                )}

                            </div>
                            <form className="a" onSubmit={submitHandler} encType='multipart/form-data' >
                                {/* {loadings ? <Loader /> : ( */}
                                <div className="modal-body">

                                    {/* <div className="form-group">
                                        <label>Description: </label>
                                        {OfferExists[0] && (
                                            <textarea
                                                name="description"
                                                id="description" className="form-control mt-3"
                                                style={{ minHeight: '200px' }}
                                                placeholder='what you should do?'

                                                value={OfferExists[0].description}


                                                onChange={(e) => setDescription(e.target.value)}
                                            >
                                            </textarea>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="stock_field">Price</label>
                                        {OfferExists[0] && (
                                            <input
                                                type="number"
                                                id="stock_field"
                                                className="form-control"
                                                value={OfferExists[0].transaction[0].price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        )}
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="stock_field">Expected Date Finished</label>
                                        {OfferExists[0] && (
                                            <input
                                                type="date"
                                                id="stock_field"
                                                className="form-control"
                                                value={OfferExists[0].transaction[0].expected_Date}

                                                onChange={(e) => setExpectedDate(e.target.value)}
                                            />
                                        )}
                                    </div>
 */}






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



        </Fragment >

    )
}

export default SingleChat