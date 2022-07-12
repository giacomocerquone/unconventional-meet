console.info('chrome-ext template-react-ts content script')

export {}

window.onbeforeunload = () => null

window.addEventListener('beforeunload', (event) => {
  if (document.querySelector('button[aria-label="Leave call"]')) {
    event.preventDefault()
    event.stopImmediatePropagation()
    event.stopPropagation()
    event.returnValue = 'Are you sure you want to leave?'
  } else {
    return
  }
})
