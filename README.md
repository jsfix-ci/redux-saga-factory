


# redux-saga-factory 🏭

> Next generation sagas using classes and decorators

[![codecov](https://codecov.io/gh/Iqoqo/redux-saga-factory/branch/master/graph/badge.svg?token=mU8Sen0Vez)](https://codecov.io/gh/Iqoqo/redux-saga-factory)
[![CircleCI](https://circleci.com/gh/Iqoqo/redux-saga-factory/tree/master.svg?style=svg)](https://circleci.com/gh/Iqoqo/redux-saga-factory/tree/master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


# Introduction 

Sagas are great, but they don’t always fit nicely inside large scale projects since:

1.  They are nothing more than generator functions, so it is impossible to use them with dependency injection patterns.
2.  You often have to type repeated boilerplate only to wrap the actual action handler.

This library will allow you to: 

1.  Create sagas using factory classes.
2.  Leverage decorators to yield common saga patterns (hence removing boilerplate).


## Installation

```
yarn install redux-saga-factory reflect-metadata
```

## Usage

### 1. Create Saga using class & decorators

```js
import 'reflect-metadata'
import { take, SagaFactory } from 'redux-saga-factory'

export class KickassSaga extends SagaFactory {

    @take("some-action")
    *onSomeAction(action) {
        const result = yield call(fetchSomething);
        return result.data;
    }
}
```

### 2. Use the saga

```js
import { KickassSaga } from "./KickassSaga.ts";

// Setup the factory 
const kickassSaga = new KickassSaga(/* dependencies? */);

// Get the sagas
const sagas = kickassSaga.getSagas();

// sagas === { onSomeAction: [Function: onSomeAction]}

// Create the store as usual
import { Action, createStore, applyMiddleware } from "redux";
import sagaMiddlewareFactory from "redux-saga";

const sagaMiddleware = sagaMiddlewareFactory();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

Object.values(saga).forEach(item => sagaMiddleware.run(item));
```

> ⚠️ **You must `import "reflect-metadata"` polyfill  and you should only import it once in the code.**

# Deeper look

Say you have this saga:

```js
function* someSaga() {
  while (true) {
    const action = yield take("some_action");
    yield call(sagaWorker, action);
  }
}

function* sagaWorker(action) {
  // do the magic
}
```

We can change it to this

```js
class SomeSaga {
  @take("some_action")
  static *sagaWorker(payload) {
    // do the magic
  }
}

// and use it by...

const sagas = SagaFactory.fromMetadata(SomeSaga);

// sagas = { some_action_saga: [Function: sagaWorker] }
```

Or, if we want to add dependency injection:

```js
class SomeSaga extends SagaFactory {

	private readonly logger :ILogger;

	constructor(logger:ILogger){
		this.logger = logger;
	}

	@take("some_action")
	*sagaWorker(payload) {
		this.logger.debug("saga with di!")
		// do the magic
	}

}

// and use it by...

const factory = new SomeSaga(loggerInsatance);

const sagas = factory.getSagas()

// sagas = { some_action_saga: [Function: sagaWorker] }
```

You can also use the Factory to generate multiple sagas or use different effect patterns:

```js
class MultiSaga extends SagaFactory {

	@take("some_action")
	*sagaWorker(payload) {
		logger.debug("saga with di!")
		// do the magic
	}

	@takeLatest("some_action")
	*anotherSagaWorker(payload) {
		// using takeLatest effect instead of take
	}
}
```

## Use with typescript-fsa:

This library is 100% compatible with [typescript-fsa](https://www.npmjs.com/package/typescript-fsa), which provides "type-safe experience with Flux actions with minimum boilerplate".

```js
import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory();
const fsaAction = actionCreator<{ foo: string }>("SUBMIT_ACTION");

class FsaSaga extends SagaFactory {

	@take(fsaAction)
	*sagaWorker(payload) {
		// do the magic
	}

}
```

## Use with typescript-fsa-redux-saga

Another great library is [typescript-fsa-redux-saga](https://github.com/aikoven/typescript-fsa-redux-saga) which easily wraps sagas with async actions. Resulting saga dispatches started action once started and done/failed upon finish.

This can be achieved automatically with `redux-saga-factory` by passing the AsyncAction creator as an argument:

```js
import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory();
const fsaAction = actionCreator<{ foo: string }>("SUBMIT_ACTION");
const fsaAsyncAction = actionCreator.async<{ foo: string }, { bar: string}>("SUBMIT_ASYNC_ACTION");

class FsaSaga extends SagaFactory {

	@take(fsaAction, fsaAsyncAction)
	*sagaWorker(payload) {
		// do the magic
	}

}

// store.dispatch(fsaAction({foo: 'bar'}))
//
// Actions fired:
//
// 1. SUBMIT_ACTION
// 2. SUBMIT_ASYNC_ACTION_STARTED
// --- Here sagaWorker will be called ---
// 3. SUBMIT_ASYNC_ACTION_DONE
```

## Use without class

TBA

## Use with custom saga pattern

TBA
