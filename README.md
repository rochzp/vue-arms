# vue-arms

> This is vue-arms which works only with Vue 2.0+.

### Introduction

This package enables you to integrate ARMS's error reporting with a Vue.js application at a detailed level. It creates and configures a Vue ErrorHandler which will capture and report unhandled errors in your app.

Reported errors will contain useful debugging info from Vue's internals, such as the component name, props and any other context that Vue can provide.

### Installation

```sh
npm install --save vue-arms
# or
yarn add vue-arms
```

### Usage

```js
import VueArms from 'vue-arms'

const logger = new VueArms({
  pid: 'ARMS_PID'
})

Vue.use(logger)
```

### Configuration

Params | Type | Description | Request | Default
:- | :- | :- | :- | :-
config | Object | site configuration, it contains the attribute `pipe`, this property is used to pre-report content, for other properties, see [alife-logger](https://help.aliyun.com/document_detail/66404.html) | yes | - |
useEnvs | Array| use environment | no | ['production'] |

Support all configurations in [alife-logger](https://help.aliyun.com/document_detail/66404.html).

### Support

- [ARMS](https://help.aliyun.com/document_detail/58652.html)

### License

[ISC](http://opensource.org/licenses/ISC)

Copyright (c) 2019-present Roc
