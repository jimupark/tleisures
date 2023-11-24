const fetch = require('node-fetch')

async function searchProduct(destinationId, startNumber, startDate){
    let filtering = {}

    if(destinationId !== undefined) {
        filtering.destination = destinationId
    }
    if(startDate !== undefined) {
        filtering.startDate = startDate
    }
    
    const searchResult = await fetch('https://api.viator.com/partner/products/search',{
        method:'post',
        headers:{
            'Accept-Language' : 'en-US',
            'Accept' : 'application/json;version=2.0',
            'exp-api-key' : 'ca66d5d2-fb96-4cb8-8683-eb825a6e6c84',
            'Content-Type': 'application/json'
        },
        body :JSON.stringify({
            "filtering": filtering,
            "pagination": {
                "start": startNumber,
                "count": 25
                },
            "currency": "JPY"
        })

    })
    const data = await searchResult.json()
    return data
}

async function fetchDestination(){
    const searchResult = await fetch('https://api.viator.com/partner/v1/taxonomy/destinations',{
        method:'get',
        headers:{
            'Accept-Language' : 'en-US',
            'Accept' : 'application/json;version=2.0',
            'exp-api-key' : 'ca66d5d2-fb96-4cb8-8683-eb825a6e6c84',
            'Content-Type': 'application/json'
        },
    })
    const data = await searchResult.json()
    return data
}



module.exports = {
    searchProduct: searchProduct, //키:import 쪽에서 사용할 이름  Value : Export 할 대상(함수 또는 변수수)
    fetchDestination:fetchDestination
}

