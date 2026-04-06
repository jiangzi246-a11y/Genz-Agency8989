// ========================================
// TELEGRAM BOT CONFIGURATION
// ========================================
// Replace with your own Telegram Bot Token and Chat ID
const TELEGRAM_BOT_TOKEN = '8517192667:AAF9WFmq2V90gknoiyLVbxcrXBHk_-0QXVk'; // Get from @BotFather on Telegram
const TELEGRAM_CHAT_ID = '976579012';     // Your Telegram user ID or group ID

// ========================================
// MOBILE MENU HANDLER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    if (navMenu) {
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideHeader = event.target.closest('header');
        if (!isClickInsideHeader && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ========================================
// FORM SUBMISSION HANDLER
// ========================================
function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted');

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const company = document.getElementById('company').value.trim();
    const message = document.getElementById('message').value.trim();

    console.log('Form data:', { name, email, company, messageLength: message.length });

    // Validate form
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        console.warn('Form validation failed: Missing required fields');
        return;
    }

    // Show loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Format message for Telegram
    const telegramMessage = formatTelegramMessage(name, email, company, message);

    // Send to Telegram
    console.log('Sending to Telegram...');
    sendToTelegram(telegramMessage)
        .then(response => {
            console.log('Telegram API response:', response.status, response.statusText);
            if (response.ok) {
                showNotification('✅ Message sent successfully! We\'ll contact you soon.', 'success');
                event.target.reset(); // Clear form
                document.getElementById('name').focus();
            } else {
                return response.json().then(data => {
                    console.error('Telegram error response:', data);
                    throw new Error('Failed to send message: ' + (data.description || response.statusText));
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Fallback: Show alternative contact method
            showNotification('Message couldn\'t be sent via bot. Please contact us on Telegram: @Por_GenZ', 'warning');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
}

// ========================================
// FORMAT MESSAGE FOR TELEGRAM
// ========================================
function formatTelegramMessage(name, email, company, message) {
    const timestamp = new Date().toLocaleString();
    
    let formattedMessage = `<b>📨 New Contact Form Submission</b>\n\n`;
    formattedMessage += `<b>Name:</b> ${escapeHtml(name)}\n`;
    formattedMessage += `<b>Email:</b> ${escapeHtml(email)}\n`;
    
    if (company) {
        formattedMessage += `<b>Company:</b> ${escapeHtml(company)}\n`;
    }
    
    formattedMessage += `\n<b>Message:</b>\n${escapeHtml(message)}\n\n`;
    formattedMessage += `<i>Submitted at: ${timestamp}</i>`;
    
    return formattedMessage;
}

// ========================================
// SEND MESSAGE TO TELEGRAM BOT
// ========================================
function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const data = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
    };

    console.log('Sending message to Telegram...', { url, chatId: TELEGRAM_CHAT_ID });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log('Telegram response status:', response.status);
        return response;
    })
    .catch(err => {
        console.error('Fetch error:', err);
        throw err;
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ========================================
// TELEGRAM JOIN BUTTON FUNCTIONALITY
// ========================================
function joinTelegramChannel() {
    const telegramUrl = 'https://t.me/Por_GenZ';
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
}

// ========================================
// UTILITIES
// ========================================
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('GenZ Agency Contact Form Loaded');
    console.log('Bot Token configured:', !!TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE');
    console.log('Chat ID configured:', !!TELEGRAM_CHAT_ID && TELEGRAM_CHAT_ID !== 'YOUR_CHAT_ID_HERE');
    
    // Check if telegram token is properly configured
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
        console.warn('⚠️ Telegram bot not fully configured. Bot token or Chat ID is missing.');
    } else {
        console.log('✅ Telegram bot is properly configured');
    }
});
