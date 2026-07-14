const email = "dumflo06raul@yahoo.com";
const url = `https://formsubmit.co/ajax/${email}`;

console.log("Testing URL:", url);

fetch(url, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'https://rfdportfolio.vercel.app'
  },
  body: JSON.stringify({
      name: "Raul Test",
      email: "raul.dumitrean07@gmail.com",
      message: "Test message from Node",
      _subject: "Nuevo mensaje",
      _captcha: "false"
  })
})
.then(res => res.text().then(text => ({status: res.status, text})))
.then(console.log)
.catch(console.error);
