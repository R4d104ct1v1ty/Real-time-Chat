document.querySelector('.login').innerHTML += ` <b><u>${window.location.search.slice(10)}</u></b>`


function display(text, mine = false){
    const sender = JSON.parse(text).username;
    const msg = JSON.parse(text).text;
    
    document.querySelector('.messages').innerHTML += `
        <div class='row ${mine? 'mine' : 'theirs'}'>
            <div class='bubble'>
                <span class='message'><b><u>${sender}</u></b>: </span><br>
                <span class='msg' style='font-size: 20px'>${msg}</span><br><br>
                <span class="time"><i>${new Date().toLocaleTimeString()}</i></span>
            </div>
            
        </div>
    
    `;
    // document.querySelector('body').scroll({ top: document.querySelector('body').scrollHeight, behavior: 'smooth' });
}



const socket = new WebSocket("https://websockets-chatroom-heroku.herokuapp.com");

socket.addEventListener('open', () => {
    console.log('connection established');
    
})

socket.addEventListener("message", (ev) => {
    ev.data.text().then(display);
});

document.querySelector('form').onsubmit = ev => {
    ev.preventDefault();
    const input = document.querySelector('input');
    socket.send(JSON.stringify({text:input.value, username: window.location.search.slice(10)}));
    display(JSON.stringify({text:input.value, username: window.location.search.slice(10)}), true);
    input.value = '';
}

