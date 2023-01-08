# SoftReq
Final Year Project 2022: 

Muhid Abid i180560 

Hassan Riaz i180580

Ayesha Rauf i181594

## Introduction
SoftReq is an Integrated Software Requirements Management Tool. Built using  Angular, this web application provides support for developers and business analysts with managing requirements for a software application project. 

## Features
- Track your software development projects according to workspaces and projects.
- Organize requirements for each project within a Kanban view for easy visualization.
- Add Requirement Attributes (Priority, Status, Legal Liability, Cross-Reference)
- Extract Quality Concerns.
- Detect Requirement Ambiguities.
- Check for Requirement redundancies


## How to Run
#### Prerequisites
- Install angular cli
- Set up a Mongo database with an empty workspace

#### Running the Application

"0. DEVELOPMENT" This folder is the main development folder of our project.

In‘0. DEVELOPMENT\client-angular’, to start Angular server:

    npm install
	ng serve

In‘0. DEVELOPMENT\client-angular\src’, to start Express server:

    node server.js

In‘0. DEVELOPMENT\client-angular\backend-python’, to start Python server: 

    python flask-apis.py

Open a new tab on your local browser and go to http://localhost:4200/home-page

## Web Application Structure



![projectmapping](https://user-images.githubusercontent.com/62544274/211210938-2a341c6f-543d-49cc-b5d7-4505ad8abf14.png)

## Navigating the Application
Once you sign in to the SoftReq application, you will be at the central dashboard. Here you can create new workspaces to keep track of your projects.

#### Creating a New Workspace and Project:

Click on the ‘Workspace +’ button on the left side bar of the screen.

In the pop-up window that opened, enter a name for your workspace and a small description. 

Click on ‘Create Workspace’ to go to the new workspace.

From within a workspace, multiple projects can be created. 

Go to the workspace where you want to add a new project.

Click on the ‘Create New Project’ button.

In the pop-up window that opened, enter a name for the project and a small description.

Click on ‘Create Project’.

Click on the newly-created project in the center of the screen.

#### Adding Requirement

From within a project, multiple user requirements can be assigned to that project.

User requirements can be added to the default list (‘ExampleList’, the gray component shown on the left side of the screen) , or different lists can be created to categorize requirements as needed. New lists can be created using the purple ‘New List’ button on the upper right corner of the screen.

To add user requirements to a list, click on the ‘+’ button inside any list. In the pop-up that opens, write a single requirement, then click ‘Confirm’.

Once requirements are created, you can: 

Click on ‘Extract Quality Concerns’ to see its requirement classification.

Click on the pencil icon to edit the requirement, or add attributes to the requirement.

Drag and drop a requirement from one list to another.

See all requirements in the backlog view to organize into sprints.

------------


**We hope you find SoftReq a useful application for your requirements management needs.**


<!-- # ClientAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->
