// ========================================
// TELEGRAM BOT SETUP GUIDE & HELPER
// ========================================

/*
STEP 1: CREATE A TELEGRAM BOT
===============================

1. Open Telegram and search for "@BotFather"
2. Send the command: /newbot
3. Follow the prompts:
   - Choose a name for your bot (e.g., "GenZ Agency Bot")
   - Choose a username for your bot (e.g., "genzagency_bot") - must be unique
4. BotFather will give you a TOKEN
5. Copy and save this token - keep it secret!

Example token format: 123456789:ABCDEFGhIjKlmnoPqrStUvWxYz1234567890


STEP 2: GET YOUR TELEGRAM CHAT ID
===================================

Method 1 (Using Your Own ID):
- Open Telegram desktop app
- Right-click on your profile picture
- Select "Copy user link"
- It will look like: https://t.me/yourname
- To get your numeric ID:
  1. Send any message to your bot
  2. Visit: https://api.telegram.org/bot{BOT_TOKEN}/getUpdates
  3. Replace {BOT_TOKEN} with your actual token
  4. Find the "chat": { "id": NUMBER } - this is your CHAT_ID

Method 2 (Using a Group/Channel):
- Create a private group or channel
- Add your bot to the group
- Send a message in the group
- Use the same method as above to find the group's CHAT_ID
- Group/Channel IDs start with -100


STEP 3: UPDATE THE SCRIPT
==========================

Open script.js and update these two lines:

const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';  // Replace with your token
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';      // Replace with your chat ID

Example:
const TELEGRAM_BOT_TOKEN = '123456789:ABCDEFGhIjKlmnoPqrStUvWxYz1234567890';
const TELEGRAM_CHAT_ID = '987654321';


HOW IT WORKS
=============

1. User fills out the contact form
2. Clicks "Send Message"
3. JavaScript collects the form data
4. Validates the inputs
5. Sends a formatted message to your Telegram bot
6. Bot forwards the message to your specified chat ID
7. User sees a success/error notification


TROUBLESHOOTING
================

❌ Message not sending?
- Check that TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set correctly
- Make sure the bot token is valid and hasn't been revoked
- Check browser console (F12) for errors
- Verify your CHAT_ID is correct

❌ "Message couldn't be sent via bot" error?
- This might be due to CORS issues (browser security)
- The form will still show a warning with alternative contact method
- Users can still click "Contact on Telegram" button as a backup

❌ Bot not receiving messages?
- Verify you've added the bot to the group/channel
- Ensure the CHAT_ID corresponds to the right group
- Check that the bot has permission to send messages


TESTING YOUR BOT
=================

1. Fill out the contact form with test data
2. Click "Send Message"
3. Check your Telegram for the message
4. The message should show:
   - Full Name
   - Email Address
   - Company (if provided)
   - Message content
   - Submission timestamp


ADVANCED FEATURES YOU CAN ADD
==============================

1. Store messages in a database
2. Send auto-reply to the user's email
3. Create a ticket number for tracking
4. Add file upload support
5. Integrate with CRM systems
6. Add payment processing


SECURITY NOTES
===============

⚠️ WARNING: Never expose your bot token in client-side code!
   - Anyone with your token can control your bot
   - Use a backend server for production
   - Consider using environment variables

For production websites, implement a backend that:
- Stores the bot token securely
- Makes API calls server-side
- Validates and sanitizes all inputs
- Logs all requests


SUPPORT & DOCUMENTATION
========================

- Telegram Bot API: https://core.telegram.org/bots/api
- BotFather Commands: /help
- Telegram Developer Chat: @BotSupport
*/
