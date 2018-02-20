# Redux Saga Patterns [![Build Status](https://travis-ci.org/ssaucedo/redux-saga-patterns.svg?branch=development)](https://travis-ci.org/ssaucedo/redux-saga-patterns)

Fix Twitter service config import.

```

git clone https://github.com/ssaucedo/redux-saga-patterns && cd redux-saga-patterns && npm install && npm run start

```

## Pattern 1:

Saga View decoupling:

Depending on a store's variable switch the set of running sagas. Switch toggle to alternate between CREATION or EDITION flow. 

### Why? 

- On big applications you need to set up a huge number of sagas to listen for a number of actions,
switching the sagas depending the context saves the developer from dispatching different actions for the same user interaction.

- Also you reduce the error surface listening only for flow specific actions. When you are on update flow sagasMiddleware ignores
creation flow actions as the associated sagas are not running.

         ```
         
         // instead of:
         props.flow === 'CREATION ?
            this.dispatch({type: 'OPEN_SIDEBAR_ON_CREATION'}) :
            this.dispatch({type: 'OPEN_SIDEBAR_ON_EDITION'})
            
         // or 
          props.flow === 'CREATION ?
            this.dispatch({type: 'OPEN_SIDEBAR_ON_CREATION'}) :
            this.dispatch({type: 'OPEN_SIDEBAR_ON_EDITION'})
          
         // just
            this.dispatch({type: 'OPEN_SIDEBAR'}) :
         ```
    

## Pattern 2:
  Allow a limited number of processes to execute concurrently (when queue is active). This is achieved by a semaphore approach and a queue.
  If there is no room for a new process it's added to a queue, when a semaphore is released the queue is checked and
  the enqueued operation is executed.
  Using the buttons you can enable and disable queue system, when it's disabled the app will try to execute all the operations concurrently.
  With the other one the user dispatch 50 operation requests at once.
   
  
## Pattern 3:
  Handle all interactions in sagas. UI flows handle on a centralized way User interactions and Services interactions.
  The redux store is updated from UI flows, not from Services (services are implemented as sagas on this pattern).
  This allows to easily test all the interactions on a centralized way. Removing all the flow logic from the components
  (e.g from any of the react lifecycle methods) the remain those simple.
    
## Pattern 4:
  Little set up to mock backend services trough custom snapshots.
   
Service snapshots feature is partially implemented on ***app/components/Pattern4/tests/mockServices.js***.
The idea is the following:
- Run the tests suite.
    - At the first time the service snapshots are going to be empty. So when service calls are
    resolved the SSNap service wrapper saves the method response in the snapshots folder (services are supposed to return POJOs).
    - The wrapper also ask the service for it's version, the service version is stored in the snapshot file.
  
- On the next test execution the wrapped service check's for the service version.
If it's the same it's going to look for the service snapshot information and instead
of hitting the service again it's going to return the stored information.

- When the service version is updated the wrapped discards the information stored for the deprecated version and make the real requests.
 

### Why:

 - Your service computations are expensive or just take too long.
 - You may have a limited access to BE services or limited resources.
 - Perhaps you have a good reason to don't give front end developers access to services.
 - You really want to avoid mocking you services responses manually as the BE team is continually realising.
  
### Cons, improvements. 
  
  Probably there is the need to create a snapshot object for each suite execution.
  I.e if in a saga or process test you can create an user and then update the user's name
  on that case service responses only makes sense for that particular case.
  
 
### In progress

Still trying to figure out how to implement Integration testing between backend services and sagas (Using the service snapshots too). 

### Comments:

Will like to discuss this kind of approach. Maybe it could be useful for local tests execution.
Probably the CI tools should run against real test services before a merge to master/development or running a build.  
   

## Pattern 6:
   Twitts search dashboard that refresh according to a time lapse. Each search has it's own search string and time lapse.
   Searches can be added and removed. There is a while loop that after an amount of time checks what search operation is being displayed and refresh the app's tweets. 
   

### Stack

* Redux.
* Redux-saga.
* React 16.
* Material UI.


### Todos:

* Sagas isolation. Apply pattern 1 for the whole app. 

