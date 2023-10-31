const env = require('dotenv');
env.config();

// Fetch data from the API and store it in Local Storage
function fetchDataAndStoreLocally() {
    let host = process.env.host
fetch( host + '/destinationName')
    .then(response => response.json())
    .then(data => {
        // 데이터를 로컬 스토리지에 저장
        localStorage.setItem('destinationName', JSON.stringify(data));
        console.log('데이터가 로컬 스토리지에 저장되었습니다.');
    })
    .catch(error => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    });
}

// 페이지가 로드될 때 함수 실행
window.onload = fetchDataAndStoreLocally;    


// 자동완성 기능 
$(function() {
    var destinationsData = JSON.parse(localStorage.getItem("destinationName"));
    console.log(destinationsData)
    $("#destination").autocomplete({
        source: destinationsData || [], // Use data from Local Storage, or an empty array if not available
        minLength: 1,
    });
});
