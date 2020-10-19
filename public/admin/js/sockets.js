const socket = io('http://127.0.0.1:3000');

socket.on('connectUsers', (data) => {
  let users = data.users;
  console.log(users);
  let users_qtd = document.getElementById("qtd_connectUsers");
  users_qtd.innerText = `${Number(users.length)}`
})

socket.on('disconnectUsers', (data) => {
  let users = data.users;
  let users_qtd = document.getElementById("qtd_connectUsers");
  users_qtd.innerText = `${Number(users.length)}`
})

socket.on('reviews', (data) => {
  let review = data;
  let reviews_qtd = document.getElementById("qtd_reviews");

  if (review.delete === false) {
    reviews_qtd.innerText = `${Number(reviews_qtd.textContent)+1}`;

    Toastify({
      text: `${review.user} fez um Review para ${review.catalog}`,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      offset: {
        x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function(){} // Callback after click
    }).showToast();
  } else {
    reviews_qtd.innerText = `${Number(reviews_qtd.textContent)-1}`;

    Toastify({
      text: `Um Review foi deletado`,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      offset: {
        x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      backgroundColor: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function(){} // Callback after click
    }).showToast();
  }
})

socket.on('newUsers', (data) => {
  let user = data;

  Toastify({
    text: `${user}`,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    offset: {
      x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function(){} // Callback after click
  }).showToast();
})
