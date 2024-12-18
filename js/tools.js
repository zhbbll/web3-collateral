async function get_time(){
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '-' +
                        (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
                        currentDate.getDate().toString().padStart(2, '0') + ' ' +
                        currentDate.getHours().toString().padStart(2, '0') + ':' +
                        currentDate.getMinutes().toString().padStart(2, '0') + ':' +
                        currentDate.getSeconds().toString().padStart(2, '0');
    console.log(formattedDate);
    return formattedDate;
}

function get_error_message(errorMessage){
    const match = errorMessage.match(/:\s([^:{]+)/);
    const specificMessage = match ? match[1] : 'Unknown error';
    console.log("Extracted Message:", specificMessage);
    return specificMessage;
}