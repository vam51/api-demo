# API Demo

A simple project to demonstrate the exprerince in building NodeJs micro services.

## Getting Started

### Prerequisites

Project is built using swagger template. Please install swagger as a global module

```
npm install -g swagger 
```

### Installing

Go to project root directory
Run below command
```
npm install
```

## Running the tests

Please follow below instructions to test the demo app.
### Test using swagger editor
Go to project root directory
Run below command to open the swagger editor.
```
swagger project edit
```
Open a new commnd prompt and go to project root directory.

Run below command to run the demo project.
```
swagger project start
```

Use the swagger editor to run the manual verification testing.

Below is the sample test data for verification.

```
[
    {"phonenumber":"0400000011","customerid":"C1","status":"ACTIVE"},
    {"phonenumber":"0400000012","customerid":"C1","status":"READY"},
    {"phonenumber":"0400000013","customerid":"C1","status":"ACTIVE"},
    {"phonenumber":"0400000021","customerid":"C2","status":"ACTIVE"},
    {"phonenumber":"0400000022","customerid":"C2","status":"READY"},
    {"phonenumber":"0400000031","customerid":"C3","status":"ACTIVE"},
    {"phonenumber":"0400000041","customerid":"C4","status":"READY"},
]
```

### Run unit test cases and verify coverage
Go to project root directory
Run below command to run unit test cases and verify coverage reports.
```
npm test
```
