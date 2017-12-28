# Redux Saga Patterns [![Build Status](https://travis-ci.org/ssaucedo/create-react.svg?branch=development)](https://travis-ci.org/ssaucedo/create-react)

```
npm run start
```

## Pattern 1:
  Saga View decoupling:
    Depending on a store's variable switch the running sagas.
    Switch toggle to alternate between CREATION or EDITION flow. Check `console.log`  
    

## Pattern 2:
  Keeping operations on redux, using operation Ids. This allows to keep track of multiple operations at the same time.
  Associate a component to an operation in the state. Handle multiple operations.
  
## Pattern 3:
  Handle all interactions in sagas. UI flows handle on a centralized way User interactions and Services interactions.
  The redux store is updated from UI flows, not from Services (services are implemented as sagas on this pattern).
  This allows to easily test all the interactions on a centralized way. Removing all the flow logic from the components
  (e.g from any of the react lifecycle methods) the remain simple.    
    
## Pattern 4:
   On async requests I want to refresh data depending on a time limit, if the already fetched data is older than the limit, we fetch again.
   As the fetched data now includes a timestamp add an auto refresh of data based on a timer. The idea is to define an awesome API.

### Stack

* Redux.
* Redux-saga.
* React 16.
* Styled components. // tested and removed.
* Material UI.


### Todos:

* General:
  * Sagas isolation.
  * Find a best way to handle async operations state. (new pattern?)



* Patterns:

  * Pattern 1
    * Display on a more explanatory way. Now it is just a console.log.
  * Pattern 2 to this repo
    * Find the better way to represent it.
    * Document.
  * Pattern 3 to this repo
    * Find the better way to represent it.
    * Document.
  * Pattern 4
    * Check if reselect memoization is not related.
    
# NEW IDEA:
    
    - BUILD A WEBPACK PLUGIN TO BUILD AN APP WITH DIFFERENT VIEWS!
    - WOOOO