const GetModules = async () => {
    let modules;

    try {
        console.log((process.env.REACT_APP_CANVAS_API_KEY))

        let string = process.env.REACT_APP_CANVAS_API_KEY ? `Bearer ${process.env.REACT_APP_CANVAS_API_KEY}`: ''

        let apiCall = await fetch(`${process.env.REACT_APP_CANVAS_URL}modules`, {
            'method': 'GET',
            'mode': "cors",
            'json': true,
            'resolveWithFullResponse': true,
            headers : {
                'Authorization': string,   
                // 'Content-Type': '*/*',
                // 'Accept': 'application/json',
                // "Connection": "keep-alive",
            }
        })

        console.log(apiCall)
        
        modules = apiCall.json()
        
    }
    catch {
        console.log("Failed to call the api :(")

        modules = "Failed to call the api :("
    }

    return modules;
}

export { GetModules }