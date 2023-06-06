import { fetchNotifications, getConversationId, getConversations, sendMessage } from "./helper/vinted.mjs"
import { saleMessage } from "./constants.mjs";

// Initiate global variables
let totalNotifications = []
let totalConversations = []
let latestFetch = null
let page = 1

// Function to fetch notifications with error handling and optional delay
async function fetchNotificationsWithDelay(page, delay = 3000) {
    try {
        latestFetch = await fetchNotifications(page);
        totalNotifications.push(...latestFetch);
        console.log('Fetched ', latestFetch.length, ' notifications...');
        await new Promise(resolve => setTimeout(resolve, delay));
    } catch (e) {
        console.log('Error when fetching latest notifications, page: ', page)
        latestFetch = []
    }
}

// Function to fetch conversations with error handling and optional delay
async function fetchConversationsWithDelay(page, delay = 2000) {
    try {
        latestFetch = await getConversations(page);
        totalConversations.push(...latestFetch);
        console.log('Fetched ', latestFetch.length, ' conversations...');
        await new Promise(resolve => setTimeout(resolve, delay));
    } catch (e) {
        console.log('Error when fetching latest conversations, page: ', page)
        latestFetch = []
    }
}

// Fetch all notifications
while (latestFetch === null || latestFetch.length === 20) {
    await fetchNotificationsWithDelay(page);
    page = page + 1;
}
console.log('Went through ', page, ' pages')
console.log('Found ', totalNotifications.length, ' notifications')

const favouritedNotifications = totalNotifications.filter((notification) => notification.link.includes('?offering_id='))
console.log(favouritedNotifications.length, ' notifications are favourites')

let favouritesConversationIds = []

// Get conversation IDs from favourited notifications
for (const f of favouritedNotifications) {
    const conversationId = await getConversationId(f.link)
    if (!favouritesConversationIds.map((c) => c.conversationId).includes(conversationId) && conversationId !== null && conversationId.length > 8 && conversationId.length < 14) {
        console.log('Adding: ', conversationId)
        favouritesConversationIds.push({ 
            name: f.body.substring(f.body.indexOf('">') + 2, f.body.indexOf("</a>")), 
            conversationId 
        });
	}
    await new Promise(resolve => setTimeout(resolve, 1000));
}

console.log('Filtered conversations ', favouritesConversationIds.length)

// Reset for conversation fetch
latestFetch = null;
page = 1;

// Fetch all conversations
while (latestFetch === null || latestFetch.length === 20) {
    await fetchConversationsWithDelay(page);
    page = page + 1;
}
console.log('Total existing conversations: ', totalConversations.length)
const ignoreConversations = totalConversations.map((c) => c.id)
console.log('Ignoring conversations: ', ignoreConversations.length)

// Send messages to conversations not already messaged
for (const c of favouritesConversationIds) {
    const ignoreable = ignoreConversations.find((i) => i.toString() === c.conversationId.toString()) ? true : false
    console.log('Ignore? ', c.conversationId, ' - ', ignoreable)
    if (ignoreable) {
		console.log('Ignoring ', c.conversationId, ' because already messed')
    } else {
        await sendMessage(c.conversationId, saleMessage.replace('${name}', c.name));
        console.log('Messaged ', c.name, ' (', c.conversationId, ')')
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
}
