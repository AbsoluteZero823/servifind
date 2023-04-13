import React from 'react'
import {
    Link
} from 'react-router-dom'
import {
    useSelector
    // , useDispatch 
} from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import MyChats from './MyChats'
import ChatBox from './ChatBox'


const ChatPage = () => {
    // const { user, loading } = useSelector(state => state.auth)
    const fetchChats = async () => {
        // console.log(user._id);

    }
    return (


        <div style={{ display: 'flex' }}>


            <ChatBox />




            <MyChats />

        </div>
    )
}

export default ChatPage
