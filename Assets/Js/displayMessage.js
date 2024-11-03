function disPlayMessage(message) {
  let messageContainer = document.createElement("div");
  messageContainer.innerHTML = message.message;
  messageContainer.style.width = ` 50%`;
  if (message?.minWidth) {
    messageContainer.style.minWidth = message.minWidth;
  }

  messageContainer.style.margin = "0 auto";
  messageContainer.style.fontSize = "18px";
  messageContainer.style.textAlign = "center";
  function setProperties(color, bgcolor, pad = 10, radius, border) {
    messageContainer.style.color = color;
    messageContainer.style.backgroundColor = bgcolor;
    messageContainer.style.padding = pad + "px";
    messageContainer.style.borderRadius = radius + "px";
    let [borderWidth, borderColor] = border.split(":");
    messageContainer.style.border = `${borderWidth}px solid ${borderColor}`;
  }
  if (message.type == "error") {
    setProperties("#fff", "#EB475B", message.pad, 8, "3:#E61932");
  } else if (message.type == "info") {
    setProperties("#fff", "#0CCAF3", message.pad, 8, "3:#09CEF6");
  } else if (message.type == "success") {
    setProperties("#000", "#44EE90", message.pad, 8, "3:#15EA74");
  }
  if (message?.position) {
    messageContainer.style.position = "absolute";

    messageContainer.style.left = `${(message.offset || 0) + 50}%`;
    if (message?.center) {
      messageContainer.style.top = "50%";
      messageContainer.style.transform = `translateY(-${50 - message.offset}%)`;
    } else {
      messageContainer.style.top = "110px";
    }
    messageContainer.style.transform = `translateX(-${50 - message.offset}%)`;
  }

  if (message?.delay) {
    setTimeout(() => {
      messageContainer.style.display = "none";
    }, message.delay * 1000);
  }
  message.parent.appendChild(messageContainer);
}
