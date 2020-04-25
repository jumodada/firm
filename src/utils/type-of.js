const types = {
    Date: '[object Date]',
    Object: '[object Object]',
    Array: '[object Array]',
    String: '[object String]',
    Number: '[object Number]',
    File:'[object File]',
    FormData:'[object FormData]'
}

const toString = Object.prototype.toString

export const typeOf = (val, typeName) =>
    toString.call(val) === types[typeName]

export const isNumber = (val) =>
    typeOf(val, 'Number') && !Number.isNaN(val)

export const isObject = (val) =>
    typeOf(val, 'Object')

export const isString = (val) =>
    typeOf(val, 'String')

export const isArray = (val) =>
    typeOf(val, 'Array')

export const isDate = (val) =>
    typeOf(val, 'Date')

export const isFile = (val) =>
    typeOf(val, 'File')

export const isFormData = (val) =>
    typeOf(val, 'FormData')

export const  isPromise= (obj)=> !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'