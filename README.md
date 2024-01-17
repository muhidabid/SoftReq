Final Year Project 2022: 

| Name      | Roll Num |
| --------- | -----:|
| Muhid Abid  | i180560 |
| Hassan Riaz     |   i180580 |
| Ayesha Rauf     |   i181594 |

## Introduction
SoftReq is an Integrated Software Requirements Management Tool. Built using  Angular, this web application provides support for developers and business analysts with managing requirements for a software application project. 

https://github.com/muhidabid/SoftReq/assets/82958857/3ab94eee-ab0c-4b4e-a762-7f1bd1566790

## ✅ Features
- Track your software development projects according to workspaces and projects.
- Organize requirements for each project within a Kanban view for easy visualization.
- Add Requirement Attributes (Priority, Status, Legal Liability, Cross-Reference)
- Extract Quality Concerns.
- Detect Requirement Ambiguities.
- Check for Requirement redundancies

### Details
- The ambighuity detection AI is trained on a ~3k hand-labeled software requirements dataset, which you can find in this repo, based on the [IEEE ISO/IEC 25010](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010) quality model.
- This project was done over 32 weeks in MEAN+Python web stack.
- High fidelity Figma designs were made as a base then a mongodb database was designed and integrated with NodeJS & Flask APIs, and Angular.

![FYPPoster-S22-11-D-SoftReq](https://github.com/muhidabid/SoftReq/assets/82958857/903d3dbf-8354-4bdb-a205-60ae6d1797f3)
Note: the emails mentioned in this doc are not functional anymore. You can contact us at muhidabid.cs@gmail.com

## 🏃 How to Run
#### Prerequisites
1. Install angular cli
2. Set up a Mongo database with a 'Workspaces' collection with a sample workspace of the type:

````
{
	name: {type: String},
	description: {type: String},
	projectsRef: {
		type: [ObjectId],
		index: true,
 		ref: 'Projects'
	},
}
````

3. Replace your MongoDB URL in `DEVELOPMENT\backend-express\config\db.js`

#### Running the Application

**"0. DEVELOPMENT"** This folder is the main development folder of our project.

In `0. DEVELOPMENT\client-angular`, to start Angular server:

    npm install
	ng serve

In `0. DEVELOPMENT\client-angular\src`, to start Express server:

    node server.js

In `0. DEVELOPMENT\client-angular\backend-python`, to start Python server: 

    python flask-apis.py

Open a new tab on your local browser and go to http://localhost:4200/home-page
## 🏛️ Web Application Structure



![projectmapping](https://user-images.githubusercontent.com/62544274/211210938-2a341c6f-543d-49cc-b5d7-4505ad8abf14.png)

## 🧭 Navigating the Application
Once you run the SoftReq application, you will be at the home page. Go to 'Dashboard' from the menu where you can create new workspaces to keep track of your projects.

#### Creating a New Workspace:

- Click on the ‘Workspace +’ button on the left side bar of the screen. In the pop-up window that opened, enter a name for your workspace and a small description. 

- Click on ‘Create Workspace’ to go to the new workspace.

#### Creating a New Project:

From within a workspace, multiple projects can be created. 

- Go to the workspace where you want to add a new project.

- Click on the ‘Create New Project’ button. In the pop-up window that opened, enter a name for the project and a small description.

- Click on ‘Create Project’.

- Click on the newly-created project in the center of the screen.

#### Adding Requirements

From within a project, multiple user requirements can be assigned to that project.

User requirements can be added to the default list (‘ExampleList’, the gray component shown on the left side of the screen) , or different lists can be created to categorize requirements as needed. New lists can be created using the purple ‘New List’ button on the upper right corner of the screen.

To add user requirements to a list: 
- Click on the ‘+’ button inside any list. In the pop-up that opens, write a single requirement, then click ‘Confirm’.

Once requirements are created, you can: 

- Click on ‘Extract Quality Concerns’ to see its requirement classification.

- Click on the pencil icon to add attributes to the requirement.

- Drag and drop a requirement from one list to another.

- See all requirements in the backlog view to organize into sprints.


## ❓ Get Help

For questions and bug reports open issues. 🐛

## 😋 How to contribute

Have an idea? Found a bug? See [how to contribute](contributing.md) 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

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
