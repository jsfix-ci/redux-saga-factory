# redux-saga-factory 🏭

## The why

Sagas are great, but they don’t always fit nicely inside large scale projects since:

1.  Sagas are nothing more than generator functions, so it is impossible to use them with dependency injection patterns.
2.  You often have to type repeated boilerplate only to wrap the actual action handler.

## The what

This tiny lib overcome those two issues by allowing you to:

1.  Create sagas using factory classes.
2.  Leverage decorators to yield common saga patterns.

## The how

Say you have this saga:

```js
function *someSaga() {
    while(true) {
		const action = yield take("some_action");
		yield call(sagaWorker, action)
	}
}

function * sagaWorker(action) {
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

const sagas = SagaFactory.fromMetadata(SomeSaga)

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
// --- Here sagaWorker iwll be called ---
// 3. SUBMIT_ASYNC_ACTION_DONE
```


