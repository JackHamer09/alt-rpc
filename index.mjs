const returnFromEventName = name => name + '_return';
const AsyncFunctionInstance = (async () => {}).constructor;
const defaultTimeout = 30000;

export default {
    cts: (alt, key, data) => {
        let promiseTimeout = false;
        const eventName = returnFromEventName(key);
        return new Promise((resolve,reject)=>{
            const callbackFunction = (dataFromServer) => {
                if(promiseTimeout!==false) {
                    alt.clearTimeout(promiseTimeout);
                }
                promiseTimeout = undefined;
                alt.offServer(eventName, callbackFunction);
                resolve(dataFromServer);
            }
            alt.emitServer(key,data);
            alt.onServer(eventName, callbackFunction);
            promiseTimeout = alt.setTimeout(() => {
                alt.offServer(eventName, callbackFunction);
                reject(new Error('Request timed out'));
            }, defaultTimeout);
        });
    },
    stc: (alt, player, key, data) => {
        let promiseTimeout = false;
        const eventName = returnFromEventName(key);
        return new Promise((resolve,reject)=>{
            const callbackFunction = (clientPlayer, dataFromClient) => {
                if(promiseTimeout!==false) {
                    clearTimeout(promiseTimeout);
                }
                promiseTimeout = undefined;
                alt.offClient(eventName, callbackFunction);
                resolve(dataFromClient);
            }
            alt.emitClient(player,key,data);
            alt.onClient(eventName, callbackFunction);
            promiseTimeout = setTimeout(() => {
                alt.offClient(eventName, callbackFunction);
                reject(new Error('Request timed out'));
            }, defaultTimeout);
        });
    },
    wtc: (altWeb, key, data) => {
        let promiseTimeout = false;
        const eventName = returnFromEventName(key);
        return new Promise((resolve,reject)=>{
            const callbackFunction = (dataFromClient) => {
                if(promiseTimeout!==false) {
                    clearTimeout(promiseTimeout);
                }
                promiseTimeout = undefined;
                altWeb.off(eventName, callbackFunction);
                resolve(dataFromClient);
            }
            altWeb.emit(key,data);
            altWeb.on(returnFromEventName(key), callbackFunction);
            promiseTimeout = setTimeout(() => {
                altWeb.off(eventName, callbackFunction);
                reject(new Error('Request timed out'));
            }, defaultTimeout);
        });
    },
    sRegister: (alt, key, callback) => {
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
    cRegister: (alt, key, callback) => {
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