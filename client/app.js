// global
let userName = '';

// get elements
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

const login = function (e){
  e.preventDefault();
  
  if(userNameInput.value) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
  else alert('Incorrect login!');
};

const addMessage = function (author, content){
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

const sendMessage = function (e){
  e.preventDefault();

  if(messageContentInput.value){
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
  else alert("You can't send a empty message");
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);

