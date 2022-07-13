const GetModules = async () => {
    console.log(process.env.REACT_APP_CANVAS_API_KEY)
    let modules;

    try {
        let apiCall = await fetch(`${process.env.REACT_APP_CANVAS_URL}/modules/`, {
            method: 'get',
            mode: 'cors',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': process.env.REACT_APP_CANVAS_API_KEY ? `Bearer ${process.env.REACT_APP_CANVAS_API_KEY}`: ''   
            }
        })

        modules = apiCall.json()
    }
    catch {
        console.log("Failed to call the api :(")

        modules = "Failed to call the api :("
    }

    return modules;
}

export { GetModules }