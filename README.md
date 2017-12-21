# Redux Saga Patterns [Add travis]



## Pattern 1:
  Saga View decoupling:
    Depending on a store's variable switch the running sagas.
    Switch toggle to alternate between CREATION or EDITION flow. Check `console.log`  
    

## Pattern 2:
  Keeping operations on redux, using operation Ids. This allows to keep track of multiple operations at the same time.
  Associate a component to an operation in the state. Handle multiple operations.
  
## Pattern 3:
  Handle all interactions in sagas. UI flows handle on a centralized way User interactions and Services interactions.
  The redux store is updated from UI flows, not from Services (services are implemented as sagas on this pattern) 
    

### Stack

* Redux.
* Redux-saga.
* React 16.
* Styled components.
* Material UI.