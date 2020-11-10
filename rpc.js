const returnFromEventName = name => name + '_return';
const AsyncFunctionInstance = (async () => {}).constructor;
const defaultTimeout = 30000;

exports = {
    cts: (key, data) => {
        let promiseTimeout = false;
        return new Promise((resolve,reject)=>{
            alt.emitServer(key,data);
            alt.onServer(returnFromEventName(key), (data) => {
                if(promiseTimeout!==false) {
                    alt.clearTimeout(promiseTimeout);
                }
                promiseTimeout = undefined;
                resolve(data);
            });
            promiseTimeout = alt.setTimeout(() => {
                reject(new Error('Request timed out'));
            }, defaultTimeout);
        });
    },
    stc: (player, key, data) => {
        let promiseTimeout = false;
        return new Promise((resolve,reject)=>{
            alt.emitClient(player,key,data);
            alt.onClient(returnFromEventName(key), (player, data) => {
                if(promiseTimeout!==false) {
                    clearTimeout(promiseTimeout);
                }
                promiseTimeout = undefined;
                resolve(data);
            });
            promiseTimeout = setTimeout(() => {
                reject(new Error('Request timed out'));
            }, defaultTimeout);
        });
    },
    wtc: (altWeb, key, data) => {
        let promiseTimeout = false;
        return new Promise((resolve,reject)=>{
            altWeb.emit(key,data);
            altWeb.on(returnFromEventName(key), (data) => {
                if(promiseTimeout!==false) {
                    clearTimeout(promiseTimeout);
                }
                promiseTimeout = undefined;
                resolve(data);
            });
            promiseTimeout = setTimeout(() => {
                reject(new Error('Request timed out'));
            }, defaultTimeout);
        });
    },
    sRegister: (key, callback) => {
        alt.onClient(key, async (player, data) => {
            if(callback instanceof AsyncFunctionInstance) {
                data = await callback(player, data);
            }
            else {
                data = callback(player, data);
            }
            alt.emitClient(player, returnFromEventName(key), data);
        });
    },
    cRegister: (key, callback) => {
        alt.onServer(key, async (data) => {
            if(callback instanceof AsyncFunctionInstance) {
                data = await callback(data);
            }
            else {
                data = callback(data);
            }
            alt.emitServer(returnFromEventName(key), data);
        });
    },
    wcRegister: (webview, key, callback) => {
        webview.on(key, async (data) => {
            if(callback instanceof AsyncFunctionInstance) {
                data = await callback(data);
            }
            else {
                data = callback(data);
            }
            webview.emit(returnFromEventName(key), data);
        });
    },
}