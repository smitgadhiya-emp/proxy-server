

export const consumeQueue = (keyAndMessage) => {

    switch (keyAndMessage.key) {    
        case "test 1":
            test1(keyAndMessage);
            break;
        
        case "test 2":
            test2(keyAndMessage);
            break;    

        default:
            throw new Error(`No handler for key: ${keyAndMessage.key}`);
    }

}


function test1(keyAndMessage){
    console.log("test1");
}

function test2(keyAndMessage){
    throw new Error("test error");

    console.log("test2");
}