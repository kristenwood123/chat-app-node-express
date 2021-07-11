const socket = io()

// receice event server is sending to us

socket.on('countUpdated', (count) => {
  console.log('count has been updated!', count);
})

const button = document.getElementById('increment')
button.addEventListener('click', () => {
  console.log('clicked');
  socket.emit('increment')
})