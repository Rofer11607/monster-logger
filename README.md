# Installation

### install with NPM

> npm install monster-logger

### Import the TopLevelLogger into a file in the root of the project

> import {TopLevelLogger} from 'monster-logger'

### Configure the logger with your types

> export const masterLogger = new TopLevelLogger<'charge' | 'run'>()

you can add as many types as you would like, delimit with the '|' character

**Don't forget to export your masterLogger**

### Pass the events you would like to listen to using an array

> export const masterLogger = new TopLevelLogger<'charge' | 'run'>(['charge'])

### Import master logger into the file you would like to use

> import {masterLogger} from './path/to/master/logger'

### Instantiate a local logger using the MasterLogger and pass it the events you would like to listen to locally

> const localLogger = masterLogger.defineTriggers(['run'])

optionally you can pass a config object, that config will then be applied to all logs using the local logger

> const localLogger = masterLogger.defineTriggers(['run'], {level: 'info', label: 'this is a test'})

### Thats it! Enjoy programmatic turning on and off of console logs. No more going in and erasing logs or wishing you hadn't erased logs!
