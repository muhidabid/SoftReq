
Editor.md
Open source online Markdown editor.

SoftReq is an Integrated Software Requirements Management Tool. Built using  Angular, this web application provides support for developers and business analysts with managing requirements for a software application project. 

## ✅ Features
- Track your software development projects according to workspaces and projects.
- Organize requirements for each project within a Kanban view for easy visualization.
- Add Requirement Attributes (Priority, Status, Legal Liability, Cross-Reference)
- Extract Quality Concerns.
- Detect Requirement Ambiguities.
- Check for Requirement redundancies


## 🏃 How to Run
#### Prerequisites
- Install angular cli
- Set up a Mongo database with a 'Workspaces' collection with a sample workspace of the type:

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

## 🏛️ Web Application Structure



![projectmapping](https://user-images.githubusercontent.com/62544274/211210938-2a341c6f-543d-49cc-b5d7-4505ad8abf14.png)

## 🧭 Navigating the Application
Once you run the SoftReq application, you will be at the home page. Go to 'Dashboard' from the menu where you can create new workspaces to keep track of your projects.
SoftReq
Final Year Project 2022:

Name	Roll Num
Muhid Abid	i180560
Hassan Riaz	i180580
Ayesha Rauf	i181594
Introduction
SoftReq is an Integrated Software Requirements Management Tool. Built using Angular, this web application provides support for developers and business analysts with managing requirements for a software application project.

✅ Features
Track your software development projects according to workspaces and projects.
Organize requirements for each project within a Kanban view for easy visualization.
Add Requirement Attributes (Priority, Status, Legal Liability, Cross-Reference)
Extract Quality Concerns.
Detect Requirement Ambiguities.
Check for Requirement redundancies
🏃 How to Run
Prerequisites
Install angular cli
Set up a Mongo database with a ‘Workspaces’ collection with a sample workspace of the type:
{
    name: {type: String},
    description: {type: String},
    projectsRef: {
        type: [ObjectId],
        index: true,
         ref: 'Projects'
    },
}
Running the Application
“0. DEVELOPMENT” This folder is the main development folder of our project.

In‘0. DEVELOPMENT\client-angular’, to start Angular server:

npm install
ng serve
In‘0. DEVELOPMENT\client-angular\src’, to start Express server:

node server.js
In‘0. DEVELOPMENT\client-angular\backend-python’, to start Python server:

python flask-apis.py
Open a new tab on your local browser and go to http://localhost:4200/home-page

🏛️ Web Application Structure
projectmapping

🧭 Navigating the Application
Once you run the SoftReq application, you will be at the home page. Go to ‘Dashboard’ from the menu where you can create new workspaces to keep track of your projects.

Creating a New Workspace:
Click on the ‘Workspace +’ button on the left side bar of the screen. In the pop-up window that opened, enter a name for your workspace and a small description.

Click on ‘Create Workspace’ to go to the new workspace.

Creating a New Project:
From within a workspace, multiple projects can be created.

Go to the workspace where you want to add a new project.

Click on the ‘Create New Project’ button. In the pop-up window that opened, enter a name for the project and a small description.

Click on ‘Create Project’.

Click on the newly-created project in the center of the screen.

Adding Requirements
From within a project, multiple user requirements can be assigned to that project.

User requirements can be added to the default list (‘ExampleList’, the gray component shown on the left side of the screen) , or different lists can be created to categorize requirements as needed. New lists can be created using the purple ‘New List’ button on the upper right corner of the screen.

To add user requirements to a list:

Click on the ‘+’ button inside any list. In the pop-up that opens, write a single requirement, then click ‘Confirm’.
Once requirements are created, you can:

Click on ‘Extract Quality Concerns’ to see its requirement classification.

Click on the pencil icon to add attributes to the requirement.

Drag and drop a requirement from one list to another.

See all requirements in the backlog view to organize into sprints.

❓ Get Help
For questions and bug reports open issues. 🐛

😋 How to contribute
Have an idea? Found a bug? See how to contribute

Further help
To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.

We hope you find SoftReq a useful application for your requirements management needs.

Example
<link rel="stylesheet" href="editormd/css/editormd.css" />
<div id="test-editor">
    <textarea style="display:none;">### Editor.md

**Editor.md**: The open source embeddable online markdown editor, based on CodeMirror & jQuery & Marked.
    </textarea>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="editormd/editormd.min.js"></script>
<script type="text/javascript">
    $(function() {
        var editor = editormd("test-editor", {
            // width  : "100%",
            // height : "100%",
            path   : "editormd/lib/"
        });
    });
</script>
Copy
More Examples >>

Features
Support Standard Markdown / CommonMark and GFM(GitHub Flavored Markdown);
Full-featured: Real-time Preview, Image (cross-domain) upload, Preformatted text/Code blocks/Tables insert, Code fold, Search replace, Read only, Themes, Multi-languages, L18n, HTML entities, Code syntax highlighting...;
Markdown Extras : Support ToC (Table of Contents), Emoji, Task lists, @Links...;
Support TeX (LaTeX expressions, Based on KaTeX), Flowchart and Sequence Diagram of Markdown extended syntax;
Support identification, interpretation, fliter of the HTML tags;
Support AMD/CMD (Require.js & Sea.js) Module Loader, and Custom/define editor plugins;
Compatible with all major browsers (IE8+), compatible Zepto.js and iPad;
Support Custom theme styles;
Download & install
Latest version: v1.5.0，Update: 2015-06-09



 


Or NPM install:

npm install editor.md



Or Bower install:

bower install editor.md




Change logs:

CHANGES

Dependents
Projects :

CodeMirror
marked
jQuery
FontAwesome
github-markdown.css
KaTeX
Rephael.js
prettify.js
flowchart.js
sequence-diagram.js
Prefixes.scss

Development tools :

Visual Studio Code
Sass/Scss
Gulp.js
License
Editor.md follows the MIT License, Anyone can freely use.





Fork me on Github :







Users

 Contact Us: editor.md@ipandao.com


Editor.md
Copyright © 2015-2019 Editor.md, MIT license.

Design & Develop By: Pandao     
