class Chatbubble extends HTMLElement {
    constructor(message: string, type: "user" | "bot") {
        super()
        const bubble = document.createElement('div')
        bubble.classList.add('chatbubble-cervant')
        
        const text = document.createElement('p')
        text.classList.add('chatbubble-text__cervant')

        if (type === 'user') {
            bubble.classList.add('chatbubble-user__cervant')
        }
        else if (type === 'bot') {
            bubble.classList.add('chatbubble-bot__cervant')
        }
        text.textContent = message

        bubble.appendChild(text)
    }
}

class Chat extends HTMLElement {
    chatArea: HTMLDivElement
    dialog: HTMLDialogElement
    openButton: HTMLButtonElement

    constructor(title: string, startMessage?: string, avatar: string) {
        super()

        this.chatArea = document.createElement('div')
        this.chatArea.classList.add('chat-area__cervant')

        this.dialog = document.createElement('dialog')
        this.dialog.classList.add('dialog__cervant')

        this.openButton = document.createElement('button')
        this.openButton.classList.add('open-button__cervant')

        // create shadow root to the button
        const shadow = this.openButton.attachShadow({mode: 'open'})
        const style = document.createElement('style')
        style.textContent = `
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
            }
        `
        shadow.appendChild(style)

        // open dialog when button is clicked
        this.openButton.addEventListener('click', () => {
            this.dialog.showModal()
        })

        // create shadow root to the dialog
        const dialogShadow = this.dialog.attachShadow({mode: 'open'})
        const dialogStyle = document.createElement('style')
        dialogStyle.textContent = `
            .dialog__cervant {
                width: 400px;
                height: 600px;
                position: fixed;
                bottom: 20px;
                right: 20px;
                border-radius: 10px;
                overflow: hidden;
                border: none;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }
        `

    }

    chat(message: string): void {
        const bubble = new Chatbubble(message, 'user')
        this.appendChild(bubble)
    }

    respond(message: string): void {
        const bubble = new Chatbubble(message, 'bot')
        this.appendChild(bubble)
    }
}

customElements.define('cervant-chat', Cervant)

const chat = new Cervant('Cervant', 'Hello there!', 'https://avatars.githubusercontent.com/u/72873100?v=4')

document.body.appendChild(chat)