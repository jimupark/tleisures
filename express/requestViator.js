const fetch = require('node-fetch')

async function searchProduct(destinationId, startNumber){
    const searchResult = await fetch('https://api.sandbox.viator.com/partner/products/search',{
        method:'post',
        headers:{
            'Accept-Language' : 'en-US',
            'Accept' : 'application/json;version=2.0',
            'exp-api-key' : '79736e1d-048d-4bea-b428-b45d119d8fbc',
            'Content-Type': 'application/json'
        },
        body :JSON.stringify({
            "filtering": {
                "destination": destinationId 
            },
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
    const searchResult = await fetch('https://api.sandbox.viator.com/partner/v1/taxonomy/destinations',{
        method:'get',
        headers:{
            'Accept-Language' : 'en-US',
            'Accept' : 'application/json;version=2.0',
            'exp-api-key' : '79736e1d-048d-4bea-b428-b45d119d8fbc',
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

