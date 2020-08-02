const countElement = document.querySelector('#count');
const usersElement = document.querySelector('#users');
const statusElement = document.querySelector('#status');
const form = document.querySelector('form');
const channelNameInput = document.getElementById('channelinput');
let client;
let users = [];

form.addEventListener('submit', e => {
  e.preventDefault();
  const channel = channelNameInput.value;
  if(!channel) return;
  client = new tmi.Client({
    connection: { secure: true, 
      reconnect: true 
    },
    channels: [ channel ]
  });
  
  client.connect().then(() => {
    statusElement.textContent = `Listening for messages in ${channel}...`;
  });

  let listeningmention = false;

  client.on('message', (wat, tags, message, self) => {
    const {username} = tags;
    if(username==='jackhuang409' && message==='start-mention'){
      console.log('starting to listen');
      listeningmention = true;
    } else if(username==='jackhuang409' && message==='end-mention'){
      listeningmention = false;
    } else if(listeningmention && message.includes(channel)){
      users.push(username+" "+message+'<br />'+'<br />');
      var printthis = users.join('');
      document.getElementById("users").innerHTML = printthis;
      countElement.textContent = 'List of mentions';
    }
  });
});
