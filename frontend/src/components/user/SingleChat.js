import React, { Fragment, useState, useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import {
    useSelector
    , useDispatch
} from 'react-redux'
import { getMessages, addMessage } from '../../actions/messageActions'
import Loader from '../layout/Loader'
import { Form } from 'react-bootstrap'
import { event } from 'jquery'
import ScrollableChat from './ScrollableChat'

const SingleChat = () => {

    const dispatch = useDispatch();

    const { selectedChat } = ChatState();
    const { user } = useSelector(state => state.auth)
    const { messages, loading } = useSelector(state => state.messages)


    const [newMessage, setNewMessage] = useState([]);

    useEffect(() => {

        fetchMessages();


    }, [selectedChat]);


    const fetchMessages = async () => {
        // if (!selectedChat) return;

        dispatch(getMessages(selectedChat._id));
        console.log(messages)
    }

    const sendMessage = async (event) => {

        const messageData = new FormData();


        messageData.set('content', newMessage);
        messageData.set('chatId', selectedChat._id);
        // console.log(event)
        if (event.key === "Enter" && newMessage) {
            event.preventDefault();
            // dispatch(newOffer(offerData));\
            console.log(newMessage)
            setNewMessage("");

            dispatch(addMessage(messageData));
            // return false;

        }
        else {
            return false;
        }
    };


    const sendMessageViaButton = async (event) => {

        const messageData = new FormData();


        messageData.set('content', newMessage);
        messageData.set('chatId', selectedChat._id);
        // console.log(event)
        if (newMessage) {
            event.preventDefault();
            // dispatch(newOffer(offerData));\
            console.log(newMessage)
            setNewMessage("");

            dispatch(addMessage(messageData));
            // return false;

        }
        else {
            return false;
        }
    };

    const typingHandler = (e) => {
        // console.log(newMessage)
        setNewMessage(e.target.value);

        //Typing Indicator Logic
    };

    return (
        <Fragment>
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
            {/* <!-- end chat-header --> */}

            <div className="chat-history">
                {loading ? <Loader /> : (
                    <div>
                        <ScrollableChat messages={messages} />
                    </div>
                    // <ul>
                    //     <li className="clearfix">
                    //         <div className="message-data align-right">
                    //             <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                    //             <span className="message-data-name" >{user.name}<img className='small-circle' src={user.avatar.url} /></span>
                    //             {/* <i className="fa fa-circle me"></i> */}

                    //         </div>
                    //         <div className="message my-message float-right">
                    //             Hi Vincent, how are you? How is the project coming along?
                    //         </div>
                    //     </li>

                    //     <li>

                    //         <div className="message-data">


                    //             {/* <i className="fa fa-circle me"></i> */}
                    //             <span className="message-data-name">
                    //                 {/* <i className="fa fa-circle online"></i>  */}
                    //                 <img className='small-circle' src={selectedChat.users[0].avatar.url} />{selectedChat.users[0].name}</span>
                    //             <span className="message-data-time">10:12 AM, Today</span>
                    //         </div>
                    //         <div className="message other-message">
                    //             Are we meeting today? Project has been already finished and I have results to show you.
                    //         </div>
                    //     </li>

                    //     <li className="clearfix">
                    //         <div className="message-data align-right">
                    //             <span className="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
                    //             <span className="message-data-name" >Me &nbsp;<img className='small-circle' src={user.avatar.url} /></span>
                    //             {/* <i className="fa fa-circle me"></i> */}

                    //         </div>
                    //         <div className="message my-message float-right">
                    //             Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?

                    //         </div>

                    //     </li>

                    //     <li>
                    //         <div className="message-data">
                    //             <span className="message-data-name">
                    //                 {/* <i className="fa fa-circle online"></i>  */}
                    //                 <img className='small-circle' src={selectedChat.users[0].avatar.url} />{selectedChat.users[0].name}</span>
                    //             <span className="message-data-time">10:20 AM, Today</span>
                    //         </div>
                    //         <div className="message other-message">
                    //             Actually everything was fine. I'm very excited to show this to our team.
                    //         </div>
                    //     </li>
                    //     <li>
                    //         <div className="message-data">
                    //             <span className="message-data-name">
                    //                 {/* <i className="fa fa-circle online"></i>  */}
                    //                 <img className='small-circle' src={selectedChat.users[0].avatar.url} />{selectedChat.users[0].name}</span>
                    //             <span className="message-data-time">10:20 AM, Today</span>
                    //         </div>
                    //         <div className="message other-message">
                    //             Actually everything was fine. I'm very excited to show this to our team.
                    //         </div>
                    //     </li>



                    // </ul>
                )}
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