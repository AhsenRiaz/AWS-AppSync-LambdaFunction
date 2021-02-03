

type AppSyncEvent = {
    info : {
        fieldName : String
    },
    
    arguments : {
        product : Product
    }

}

type Product = {
    name : String
    price : Number
}

exports.handler = async (event:AppSyncEvent) => {

    if (event.info.fieldName == "welcome"){
        return "Welcome form appsync Lambda"
    }
    else if (event.info.fieldName == "hello"){
        return "hello hope you are doing fine"
    }
    else if (event.info.fieldName = "addProduct"){
        console.log(`>>> Event data = , ${event.arguments.product}`);
        return `Product Data ${event.arguments.product.name}`
        // in the above return we are returning the product name 
        // but now we are returning the complete product object as per the we defined in the schema under the comment
        return event.arguments.product
    }
    else{
        return "Not found"
    }
}