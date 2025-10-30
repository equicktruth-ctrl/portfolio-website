// In index.html, inside <script>
fetch("/.netlify/functions/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question: document.getElementById("questionBox").value })
})
.then(r => r.json())
.then(data => {
  // display the answer
})
.catch(err => {
  // display error
});
