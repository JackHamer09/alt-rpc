# alt-rpc
RPC script for AltV Multiplayer, which allows you to make async requests with response data.

* [Installation](#installation)
* [Examples](#examples)
    * [Client → Server](#client--server)
    * [Server → Client](#server--client)
    * [Web → Client](#web--client)

---

## Installation
Install with npm
```
npm i -S alt-rpc
```

---

## Examples

### Client → Server
**Client**
```js
import rpc from 'alt-rpc';

rpc.cts('testRequest', 'foo') //cts -> client to server
.then(data => {
    alt.log(data); //bar
});
```

**Server**
```js
import rpc from 'alt-rpc';

rpc.sRegister('testRequest', (player, data)=>{ //sRegister -> server register
    alt.log(data); //foo
    return 'bar';
});
```

---

### Server → Client
**Server**
```javascript
import rpc from 'alt-rpc';

rpc.stc(player, 'testRequest', 'foo') //stc -> server to client
.then(data => {
    alt.log(data); //bar
});
```

**Client**
```javascript
import rpc from 'alt-rpc';

rpc.cRegister('testRequest', (data)=>{ //cRegister -> client register
    alt.log(data); //foo
    return 'bar';
});
```

---

### Web → Client
**Web**
```javascript
import rpc from 'alt-rpc';

rpc.wtc(alt, 'testRequest', 'foo') //wtc -> web to client
.then(data => {
    alt.log(data); //bar
});
```

**Client**
```javascript
import rpc from 'alt-rpc';

rpc.wcRegister(webview, 'testRequest', (data)=>{ //wcRegister -> web-client register
    alt.log(data); //foo
    return 'bar';
});
```