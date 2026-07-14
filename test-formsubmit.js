const email = "raul.dumitrean07@gmail.com";
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
      email: "dumflo06raul@yahoo.com",
      message: "Test message from Node"
  })
})
.then(res => res.text().then(text => ({status: res.status, text})))
.then(console.log)
.catch(console.error);
