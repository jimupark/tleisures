const express = require('express')
const session = require('express-session')
const requestViator = require('./requestViator.js')
const app = express()
const port = 3000



app.use(express.static('public')); //정적 파일 폴더 설정 
app.set('views', './views'); //
// session 
app.use(session({
  secret: 'MY SECRET 1231413',
  resave: false,
  saveUninitialized: true,
  // cookie: {secure: true},
}))
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// 1. html -> static file (X), dynamic file(=view) (O) serving
// 2. html <=== data (server-side rendering)


// app.get('/hello', (req, res) => {
//   const data = [
//     {title: 'honggildong', age: 20},
//     {name: 'parkjiwon', age: 30}
//   ]

//   res.render('index.html', {users: data})
// })

//1월 16일 여기까지함 path variable,
app.get('/', (req, res)=>{
  res.redirect('/en-US')
}
)

//viator 한테 destinationName 받아서 user의 localstorage에 저장 / api 만들기
app.get('/destinationName', async (req, res) => {
  const lanreq = req.session.lanreq
  console.log(lanreq)
  const rawww = await requestViator.fetchDestination(lanreq)
  let destinationName = []
  for(let i=0; i <rawww.data.length; i++){
    destinationName.push(rawww.data[i].destinationName) 
  }
  // 중복된 데이터 삭제하기
  let uniqueArray = destinationName.filter((item, index) => {
    return destinationName.indexOf(item) === index;
  });

  res.json(uniqueArray)
})

app.get('/:lanreq', (req, res) => {
  const lanreq = req.params.lanreq
  req.session.lanreq = lanreq
  const content = require(`./language/index.${lanreq}.js`)
  res.render('index.html',{content: content, lanreq: lanreq})
})



app.get('/:lanreq/searchresult', async (req, res) => {
  // user 한테 데이터 받음
  const lanreq = req.params.lanreq
  req.session.lanreq = lanreq
  const content = require(`./language/searchresult.${lanreq}.js`)
  const destination = req.query.destination;
  const startDate = req.query.departureDate;
  const n = parseInt(req.query.n);
  let startNumber = 1 + (n-1) * 25

  //데이터와 FetchDestination 입력하기
  const raww = await requestViator.fetchDestination(lanreq)

  // FetchDestination에서 Destination ID 추출하기
  let destinationId
  for(let i=0; i <raww.data.length; i++){
    if(destination.toLowerCase() == raww.data[i].destinationName.toLowerCase()){
      destinationId = raww.data[i].destinationId
    }
  }

  // 추출한 Destination ID로 searchProduct 실행
  // console.log(destinationId)
  if(destinationId !==undefined){
  const raw = await requestViator.searchProduct(destinationId.toString(), startNumber, startDate, lanreq)
  pageNumber = Math.ceil(raw.totalCount / 25)
  console.log(raw)
  res.render('searchresult.html', {content: content, users: raw.products, destination: destination, totalPage: pageNumber, departureDate : startDate, currentPage: n, lanreq : lanreq})
  }
  else{
    res.render('searchresult.html', {content: content, users: [],destination: destination, departureDate: startDate, lanreq : lanreq} ) 
  }
  })




// app.get('/hi', (req, res) => {
//   res.send('Hello World!!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// undefined 시에 searchresult가 undefined 받아서 검색결과 0 으로 response 주기 

// 1. 페이지네이션 고쳐보기 2. 페이지네이션 css 다시 만지기  3. 디자인 토킹어바웃 해보기 ! 