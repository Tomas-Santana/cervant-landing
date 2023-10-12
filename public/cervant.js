class Chatbubble {
    constructor(message, type, avatar) {

        this.messageContainer = document.createElement('div');
        this.messageContainer.classList.add('message-container__cervant');
        this.messageContainer.classList.add(`message-container__cervant--${type}`);

        this.bubble = document.createElement('div')
        this.bubble.classList.add('chat-bubble__cervant')

        const avatarContainer = document.createElement('div')
        avatarContainer.classList.add('avatar-container__cervant')

        const avatarImg = document.createElement('img')
        avatarImg.setAttribute('src', avatar)

        avatarContainer.appendChild(avatarImg)
        
        const text = document.createElement('p')
        text.classList.add('chat-bubble-text__cervant')

        
        text.textContent = message


        this.messageContainer.appendChild(avatarContainer)
        this.messageContainer.appendChild(this.bubble)
        this.bubble.appendChild(text)


        // document.body.appendChild(style)
    }
}

class Cervant extends HTMLElement {

    constructor(endpoint, apiKey, name, startMessage, avatar, userAvatar) {
        super()

        // set css variables
        const variables = document.createElement('style')
        variables.innerHTML = `
            :root {
                --avatar-url: url(${avatar});
                --user-avatar-url: url(${userAvatar});
            }
        `

        document.head.appendChild(variables)

        this.avatar = avatar;
        this.userAvatar = userAvatar;
        this.endpoint = endpoint;
        this.apiKey = apiKey;

        this.chatArea = document.createElement('div')
        this.chatArea.classList.add('chat-area__cervant')

        this.chatAreaContainer = document.createElement('div')
        this.chatArea.appendChild(this.chatAreaContainer)

        
        this.dialog = document.createElement('dialog')
        this.dialog.classList.add('dialog__cervant')

        this.openButton = document.createElement('button')
        this.openButton.classList.add('open-button__cervant')


        // dialog content

        const dialogContent = document.createElement('div')
        dialogContent.classList.add("dialog-content__cervant")

        const header = document.createElement('div')
        header.classList.add('header__cervant')

        dialogContent.appendChild(header)

        dialogContent.appendChild(this.chatArea)

        header.innerHTML = `
            <h1>Ask ${name}</h1>
            <button class="header-button__cervant">
                <?xml version="1.0" encoding="UTF-8"?><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke-width="1.5" viewBox="0 0 24 24" color="#000000"><path stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6.758 17.243 12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path></svg>
                <span class="sr-only__cervant">Close</span>
            <button>
        `

        const inputField = document.createElement('div')

        const inputFieldInput = document.createElement('input')

        inputFieldInput.classList.add('input-field-input__cervant')

        inputFieldInput.setAttribute('type', 'text')
        inputFieldInput.setAttribute('placeholder', 'message')

        inputField.classList.add('input-field__cervant')

        inputField.appendChild(inputFieldInput)

        const inputFieldButton = document.createElement('button')

        inputFieldButton.classList.add('input-field-button__cervant')

        inputFieldButton.innerHTML = `
            <?xml version="1.0" encoding="UTF-8"?><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke-width="1.5" viewBox="0 0 24 24" color="#000000"><path stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M22 12 3 20l3.563-8L3 4l19 8ZM6.5 12H22"></path></svg>
            <span class="sr-only__cervant">Send</span>`
        
        inputField.appendChild(inputFieldButton)

        // chat logic

        inputFieldInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && inputFieldInput.value !== '') {
                this.chat(inputFieldInput.value)
                inputFieldInput.value = ''
            }
        })

        inputFieldButton.addEventListener('click', () => {
            if (inputFieldInput.value === '') return
            this.chat(inputFieldInput.value)
            inputFieldInput.value = ''
        })
        // reduce dialog size if keyboard is up (mobile only)
        if (typeof window !== 'undefined' && window.screen.width < 600) {
            inputFieldInput.addEventListener('focus', () => {
                console.log('focus')
                this.dialog.classList.add('dialog-focussed__cervant')
                setTimeout(() => {
                    window.scrollTo(0,0)
                }, 1000);
            })
            // remove height if keyboard is closed
            inputFieldInput.addEventListener('blur', () => {
                this.dialog.classList.remove('dialog-focussed__cervant')
            })
        }

        dialogContent.appendChild(inputField)


        this.dialog.appendChild(dialogContent);

        this.openButton.addEventListener('click', () => {
            this.dialog.showModal()
            // scroll to top
            if (typeof window !== 'undefined') {
                window.scrollTo(0, 0)
            }
        })

        const closeButton = this.dialog.querySelector('.header-button__cervant')
        closeButton.addEventListener('click', () => {
            this.dialog.close()
        })
    }

    addToBody() {
        document.body.appendChild(this.dialog)
        document.body.appendChild(this.openButton)
    }

    chat(message)  {
        const bubble = new Chatbubble(message, 'user', this.userAvatar)
        this.chatAreaContainer.appendChild(bubble.messageContainer)

        this.respond(message)
    }

    respond(message) {
        const payload = {
            message: message,
            key: this.apiKey
        }
        const response = fetch(this.endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        )
        .then(res => res.json())
        .then(res => {
            const bubble = new Chatbubble(res.message, 'cervant', this.avatar)
            this.chatAreaContainer.appendChild(bubble.messageContainer)
        })
        
    }
}
// global 


customElements.define('cervant-chat', Cervant)

const chat = new Cervant(
    'https://c6e3-181-232-182-96.ngrok-free.app/webchat',
    "popo",
    'Cervant',
    'Hello there!',
    'https://www.thegreenhead.com/imgs/xl/genuine-lifesize-lost-in-space-b-9-robot-xl.jpg', 'https://img.myloview.com/stickers/user-icon-human-person-symbol-avatar-login-sign-400-260980474.jpg'
)
chat.addToBody()

console.log("hello!")

const styleLink = document.createElement('link')

styleLink.setAttribute('rel', 'stylesheet')
styleLink.setAttribute('href', 'https://cervant.chat/cervant.css')
document.head.appendChild(styleLink)