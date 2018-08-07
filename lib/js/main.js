const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
const database = firebase.database().ref();
/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    const data = {
        USERNAME:username,
        MESSAGE:message,
     }
     database.push(data);
}



// Set database "child_added" event listener here
database.on("child_added",addMessage);

function addMessage(rowData){
    const row = rowData.val();
    const name = row.USERNAME;
    const msg = row.MESSAGE;
    
    let messageDiv = document.getElementsByClassName("allMessages")[0];

    let para = document.createElement("p");

    para.innerText = `${name}: ${msg}`;

    messageDiv.appendChild(para);
}