export const setPopoverPosition = (self,reference,popover) => {
    if (!self.visible) return
    if (popover.parentElement.nodeName.toLowerCase() !== 'body') {
        document.body.appendChild(popover)
    }
    let {top, left, height, width} = reference.getBoundingClientRect()
    setPosition(popover, top, left, width, height,self)
    self.$nextTick(() => setTransform(popover, height, width,self))
}
export const setTransform = ($el, height, width,self) => {
    let contentWidth = $el.clientWidth
    let contentHeight = $el.clientHeight
    let widthDiffer = -(Number(contentWidth) - width)
    let heightDiffer = -(Number(contentHeight) - height)
    let transform = {
        'top-start': `translate(0,-100%)`,
        top: `translate(${widthDiffer / 2}px,-100%)`,
        'top-end': `translate(calc(-100% + ${width}px),-100%)`,
        'left-start': `translate(-100%,0)`,
        left: `translate(-100%,${heightDiffer / 2}px)`,
        'left-end': `translate(-100%,${heightDiffer}px)`,
        'bottom-start': `translate(-${width}px,0)`,
        bottom: `translate(calc(${-(width + contentWidth) / 2 + 'px'}),0)`,
        'bottom-end': `translate(-${contentWidth}px,0)`,
        'right-start': `translate(0,0)`,
        right: `translate(0,${heightDiffer / 2}px)`,
        'right-end': `translate(0,${heightDiffer}px)`
    }
    $el.style.transform = transform[self.position]
}
export const setPosition = ($el, top, left, width, height,self) => {
    let _tTop, _rTop, _tLeft, _rLeft
    _tTop = top + window.scrollY
    _rTop = top + height + window.scrollY
    _tLeft = left + window.scrollX
    _rLeft = left + width + window.scrollX
    let _position = self.position.split('-')[0]
    let position = {
        top: {top: _tTop, left: _tLeft},
        left: {top: _tTop, left: _tLeft},
        bottom: {top: _rTop, left: _rLeft},
        right: {top: _tTop, left: _rLeft}
    }
    Array.from(['left', 'top']).forEach(attr => $el.style[attr] = position[_position][attr] + 'px')
}