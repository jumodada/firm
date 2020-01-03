export  const getScrollBarWidth = ()=> {
    const scrollBar = document.createElement('div')
    let style = {
        height: '50px',
        overflow: 'scroll',
        position: 'absolute',
        top: '-9999px',
        width: '50px'
    }
    Object.keys(style).forEach(item => scrollBar.style[item] = style[item])
    document.body.appendChild(scrollBar)
    let scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth
    document.body.removeChild(scrollBar)
    return scrollBarWidth
}