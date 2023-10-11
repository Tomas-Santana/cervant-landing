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

class Chat extends HTMLElement {

    constructor(title, startMessage, avatar, userAvatar) {
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
            <h1>Ask ${title}</h1>
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



        const style = document.createElement('style')
        style.textContent = `
            html, body {
                scroll-behavior: smooth;
            }
            .open-button__cervant {
                background: url(${avatar});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                border-radius: 50%;
                height: 50px;
                width: 50px;
                border: none;
                cursor: pointer;
                position: fixed;
                bottom: 20px;
                right: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                transition: transform 0.2s ease-in-out;
            }
            .open-button__cervant:hover {
                transform: scale(1.1);
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            }
            .dialog__cervant {
                width: 400px;
                height: 600px;
                border-radius: 10px;
                overflow: hidden;
                border: none;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease-in-out;

            }

            .dialog-content__cervant {
                width: 100%;
                height: 100%;
                display:flex;
                flex-direction:column;
                justify-content:flex-start;
            }

            .dialog__cervant[open] {
                animation: appear 0.2s ease-in-out;
            }
            dialog.dialog__cervant--closing {
                animation: disappear 0.2s ease-in-out;
            }
            @keyframes appear {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            @keyframes disappear {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }

            .header__cervant {
                background: #010101;
                border-bottom: 1px solid #ddd;
                padding: 10px 20px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 70px;
            }

            .header-avatar__cervant {
                border-radius:50%;
                width: 50px;
                height: 50px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                
                position: absolute;
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
            }
            .header-avatar__cervant img {
                border-radius:50%;
                width: 50px;
                height: 50px;
            }

            .header__cervant h1 {
                margin: 0;
                font-size: 1.5rem;
                text-align: center;
                color: white

            }
            .header-button__cervant {
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                border: none;
                background: none;
                font-size: 1.2rem;
                cursor: pointer;
                outline: none;
            }
            .header-button__cervant:hover svg path{
                stroke: red;
            }

            .header-button__cervant svg path{
                stroke: white;
            }

            .chat-area__cervant {
                flex:1;
                overflow: auto;
                display: flex;
                flex-direction: column-reverse;
            }

            .input-field__cervant {
                display: flex;
                justify-content: space-around;
                align-items:center;
                padding: 10px;
                height: 80px;
                gap: 10px;
            }

            .input-field__cervant input {
                height: 40px;
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
                border-radius:10px; 
                padding: 7px;
                flex: 1;
                transition: .2s ease;

            }
            .input-field__cervant input:focus, .input-field__cervant input:hover {
                outline: none;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);

            }
            .input-field__cervant button {
                background-color: green;
                width:40px;
                height:40px;
                border-radius: 50%;
                display: grid;
                place-items:center;
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

                transition: .25s ease;
            }

            .input-field__cervant button:hover {
                transform: rotate(-25deg);
            }
        
            .sr-only__cervant {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border-width: 0;
            }

            .dialog-focussed__cervant {
                height: 300px;
                transform: translateY(-150px);
            }
        `
        // document.body.appendChild(style)

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
            message: message
        }
        const response = fetch('https://showcase-bot-3.azurewebsites.net/webchat',
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
            const bubble = new Chatbubble(res.response, 'cervant', this.avatar)
            this.chatAreaContainer.appendChild(bubble.messageContainer)
        })
        
    }
}
// global 


customElements.define('cervant-chat', Chat)

const chat = new Chat('Cervant', 'Hello there!', 'https://www.thegreenhead.com/imgs/xl/genuine-lifesize-lost-in-space-b-9-robot-xl.jpg', 'https://img.myloview.com/stickers/user-icon-human-person-symbol-avatar-login-sign-400-260980474.jpg')
chat.addToBody()

console.log("hello!")

const styleLink = document.createElement('link')

styleLink.setAttribute('rel', 'stylesheet')
styleLink.setAttribute('href', '/cervant.css')
document.head.appendChild(styleLink)