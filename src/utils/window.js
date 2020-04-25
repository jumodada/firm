export const getScrollBarWidth = () => {
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

export const getNodeName = (element) => {
    return element ? (element.nodeName || '').toLowerCase() : null;
}

export const getParentNode = (el) => {
    if (getNodeName(el) === 'html') return el
    return (
        el.parentNode || el.host || document.ownerDocument || document.documentElement
    )
}

export const isBody = (node)=>{
    let name =getNodeName(node)
    return name === 'body'||name==='html'
}

export const isHTMLElement = (node)=> {
    return node instanceof window.HTMLElement
}

export const getAllScrollParents = (node,list)=> {
    if(!list)list = []
    if (isBody(node))return list
    if (isHTMLElement(node)) {
        const {overflow, overflowX, overflowY} = getComputedStyle(node)
        if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) {
            list.push(node)
        }
    }
    return getAllScrollParents(getParentNode(node),list)
}