class ControleIluminacao {
    constructor() {
        if (ControleIluminacao.instance) {
            return ControleIluminacao.instance;
        }
        ControleIluminacao.instance = this;
        this.observers = [];
        this.lampStatus = {
            livingRoom: 'desligada',
            kitchen: 'desligada',
            bedroom: 'desligada',
            bathroom: 'desligada'
        };
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.lampStatus));
    }

    toggleLight(room) {
        this.lampStatus[room] = this.lampStatus[room] === 'desligada' ? 'ligada' : 'desligada';
        this.notifyObservers();
    }
}

class Room {
    constructor(roomElement, roomName) {
        this.roomElement = roomElement;
        this.roomName = roomName;
        this.lamp = roomElement.querySelector('.lamp');
        this.roomImage = roomElement.querySelector('.room-image');
        this.control = new ControleIluminacao();
        this.control.addObserver(this);
        this.update(this.control.lampStatus);
        this.addButtonListener();
    }

    update(lampStatus) {
        const status = lampStatus[this.roomName];
        const button = document.getElementById(this.roomName + 'Button');
        const offButton = button.querySelector('.off');
        const onButton = button.querySelector('.on');
        const statusElement = button.querySelector('.status');
    
        if (status === 'ligada') {
            offButton.style.display = 'none';
            onButton.style.display = 'inline';
            this.lamp.src = './img/ligada.png'; // Atualiza a imagem da lâmpada para "ligada"
            this.roomImage.style.display = 'block'; // Exibe a imagem do cômodo
        } else {
            onButton.style.display = 'none';
            offButton.style.display = 'inline';
            this.lamp.src = './img/desligada.png'; // Atualiza a imagem da lâmpada para "desligada"
            this.roomImage.style.display = 'none'; // Oculta a imagem do cômodo
        }
    }

    addButtonListener() {
        const button = document.getElementById(this.roomName + 'Button');
        const room = this.roomName;
    
        button.addEventListener('click', () => {
            const lampStatus = this.control.lampStatus[room];
            this.control.toggleLight(room);
    
            // Remove o ouvinte de evento para evitar cliques repetidos até que o estado da lâmpada seja atualizado
            button.removeEventListener('click', handleClick);
    
            // Função para tratar o clique no botão
            function handleClick() {
                if (lampStatus === 'ligada') {
                    button.classList.remove('on');
                    button.classList.add('off');
                } else {
                    button.classList.remove('off');
                    button.classList.add('on');
                }
    
                // Adiciona o ouvinte de evento novamente após o estado da lâmpada ser atualizado
                button.addEventListener('click', handleClick);
            }
    
            // Chama a função de tratamento do clique no botão
            handleClick();
        });
    }    
}

const livingRoom = new Room(document.getElementById('livingRoom'), 'livingRoom');
const kitchen = new Room(document.getElementById('kitchen'), 'kitchen');
const bedroom = new Room(document.getElementById('bedroom'), 'bedroom');
const bathroom = new Room(document.getElementById('bathroom'), 'bathroom');