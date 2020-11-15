# alt-rpc
Lightweight RPC script for AltV Multiplayer, which allows you to make async requests with response data.

* [Installation](#installation)
* [Examples](#examples)
    * [Client to Server](#client-to-server)
    * [Server to Client](#server-to-client)
    * [Web to Client](#web-to-client)
* [Changelog](#changelog)
* [To Do](#to-do)

---

## Installation
Install with npm
```
npm i alt-rpc --save
```

---

## Examples

### Client to Server
**Client**
```js
import rpc from 'alt-rpc';

rpc.cts(alt, 'testRequest', 'foo') //cts -> client to server
.then(data => {
    alt.log(data); //bar
});
```

**Server**
```js
import rpc from 'alt-rpc';

rpc.sRegister(alt, 'testRequest', (player, data)=>{ //sRegister -> server register
    alt.log(data); //foo
    return 'bar';
});
```

---

### Server to Client
**Server**
```javascript
import rpc from 'alt-rpc';

rpc.stc(alt, player, 'testRequest', 'foo') //stc -> server to client
.then(data => {
    alt.log(data); //bar
});
```

**Client**
```javascript
import rpc from 'alt-rpc';

rpc.cRegister(alt, 'testRequest', (data)=>{ //cRegister -> client register
    alt.log(data); //foo
    return 'bar';
});
```

---

### Web to Client
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

---

## Changelog

**1.0.3**
* FIX: Import file ES6 syntax error
* FIX: Events are unsubscribed from handlers after the execution has done

---

## To Do

* Web to Server and Server to Web requests