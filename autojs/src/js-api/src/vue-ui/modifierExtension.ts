const ui = Autox.ui

const factoryCache = new Map<string, ModifierExtBuilder>()
function loadFactory(key: string): ModifierExtBuilder {
    if (factoryCache.has(key)) {
        return factoryCache.get(key)!
    } else {
        const f = ui.getModifierExtFactory(key)
        factoryCache.set(key, f)
        return f
    }
}
function checkNumber(numbers: any[], err?: Error) {
    numbers.forEach(n => {
        if (!n) return
        if (typeof n !== "number") {
            throw err || new Error("args Invalid number")
        }
    })
}
/**
 * 设置背景色，传入'theme'表示使用当前主题的背景色
 * @param color 颜色值,如`0xffcc12`的数值或`#ffcc89`的字符串
 * @returns 
 */
export function background(color: string | number | 'theme'): ModifierExt {
    return loadFactory("background").createModifierExt([color])
}
/**
 * 仅在row和column直接子组件上使用有效,表示此组件占用父组件剩余空间的权重,
 * 假如有一个row剩余高度为300，有一个子组件这设置了此修饰符为1,那么它的高度为300,
 * 如果有两个组件都设为1，那么这两个组件各得150高度
 * @param i 
 * @returns 
 */
export function weight(i: number): ModifierExt {
    return loadFactory("weight").createModifierExt([i])
}
/**
 * 
 * @returns 
 */
export function fillMaxSize(): ModifierExt {
    return loadFactory("fillMaxSize").createModifierExt([])
}
export function fillMaxWidth() {
    return loadFactory("fillMaxWidth").createModifierExt([])
}
export function fillMaxHeight() {
    return loadFactory("fillMaxHeight").createModifierExt([])
}
export function width(width: number) {
    return loadFactory("width").createModifierExt([width])
}
export function height(height: number) {
    return loadFactory("height").createModifierExt([height])
}
/**
 * 设置旋转角度
 * @param angle 一般为0~360 
 * @returns 
 */
export function rotate(angle: number): ModifierExt {
    return loadFactory("rotate").createModifierExt([angle])
}
export function padding(left: number, top?: number, right?: number, bottom?: number): ModifierExt {
    checkNumber([left, top, right, bottom])
    if (!top) {
        return loadFactory("padding").createModifierExt([left, left, left, left])
    }
    if (!bottom) {
        return loadFactory("padding").createModifierExt([left, top, left, top])
    }
    return loadFactory('padding').createModifierExt([left, top, right, bottom])
}

export function clickable(clickable: () => {}) {
    return loadFactory('clickable').createModifierExt([clickable])
}