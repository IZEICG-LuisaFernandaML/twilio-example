exports.handler= function (context, event,callback){
    const {name, age} = event;
    const response = new Twilio.Response();
    response.appendHeader('Content-Type','application/json');
    if(!name){
        response.setStatusCode(400).setBody({error:'The name is required'});
    }else{
        const baseMsg= context.MENSAJE_BASE || ', te recuerdo que ya casi tienes';
        const msg = `Hola, ${name}${(age? `${baseMsg} ${Number(age)+1} años!` :``)}`;
        
        response.setStatusCode(200).setBody({message:msg});
    }

    callback(null,response);
};