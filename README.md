# Redux Saga Patterns [Add travis]

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
    

### Stack

* Redux.
* Redux-saga.
* React 16.
* Styled components.
* Material UI.