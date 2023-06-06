import { VintedAxios, VintedBasicAxios } from './axios.mjs';

export const fetchNotifications = async (page) => {
    return (await VintedAxios.get(`notifications?page=${page}&per_page=20`)).data.notifications;
}

export const sendMessage = async (conversationId, message) => {
    try {
    return (await VintedAxios.post(`conversations/${conversationId}/replies`, {"reply":{"body":message,"photo_temp_uuids":null}}))
    } catch (e) {
        console.log('Error sending the message')
        //console.log(e)
    }
}

export const getConversations = async (page) => {
    return (await VintedAxios.get(`inbox?page=${page}&per_page=20`)).data.conversations
}

export const getConversationId = async (link) => {
    try {
        const result = await VintedBasicAxios.get(link)
        if (JSON.stringify(result).includes('8075')) {
            console.log('includes withoiut failure')
        }
        console.log(Object.keys(result))
        return null
    } catch (e) {
        try {
        const path = e.request._currentUrl.replace('https://www.vinted.co.uk/inbox/', '')
        return path
        } catch (another) {
            console.log(e)
        }
    }
}