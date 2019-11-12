/* 本地存储 */


export default {
    get(key){
       return JSON.parse(window.localStorage.getItem(key))
    },
    set(key,val){
        window.localStorage.setItem(key,JSON.stringify(val))

    },
    remove(key){
        window.localStorage.removeItem(key)

    },
    clear(){
        window.localStorage.clear()

    }
}