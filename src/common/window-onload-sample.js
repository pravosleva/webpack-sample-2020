// window.addEventListener('load', function() {
//   console.log('window loaded...');
// });

window.addEventListener('load', function() {
  window.toaster.message({
    text: 'Hello',
    type: 'done',
    onClick: () => {
      console.log('CLICKED');
    },
    removeFromDOMByClick: true,
    // time: 'normal',
  });
});
