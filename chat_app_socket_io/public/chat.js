let socket = io.connect();

//Objects
message = document.getElementById("message");
button = document.getElementById("send");
handle = document.getElementById("handle");
output = document.getElementById("output");
writing = document.getElementById("writing");

//Events
button.addEventListener("click", function() {
  if (message.value.length > 0 && handle.value.length > 5) {
    socket.emit("chat", {
      message: message.value,
      handle: handle.value
    });
  }
  message.value = null;
});

message.addEventListener("keypress", function() {
  socket.emit("typing", {
    handle: handle.value
  });
  console.log("p");
});

socket.on("chat", function(data) {
  writing.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function(data) {
  writing.innerHTML = `${data.handle} is typing...`;
});
