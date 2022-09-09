console.log("rubric.js");

const rubicLabels = {
  del: "Deliverables",
  vid: "Walkthrough Video",
  tac: "Technical Acceptance Criteria",
  dep: "Deployment",
  qual: "Application Quality",
  rep: "Repository Quality"
}

const rubicOrder = ["tac", "dep", "qual", "rep"]

const rubric = {
  01: {
    title: "HTML CSS Git Challenge: Code Refactor",
    criteria: [{
      text: "Application's links all function correctly.",
      flag: false,
      flag: false,
      pts: 13.3,
      group: "tac"
    },
    {
      text: "Application's CSS selectors and properties are consolidated and organized to follow semantic structure.",
      flag: false,
      flag: false,
      pts: 13.3,
      group: "tac"
    },
    {
      text: "Application's CSS file is properly commented.",
      flag: false,
      flag: false,
      pts: 13.3,
      group: "tac"
    },
    {
      text: "Application deployed at live URL.",
      flag: false,
      pts: 13.3,
      group: "dep"
    },
    {
      text: "Application loads with no errors.",
      flag: false,
      pts: 13.3,
      group: "dep"
    },
    {
      text: "Application GitHub URL submitted.",
      flag: false,
      pts: 13.3,
      group: "dep"
    },
    {
      text: "GitHub repository that contains application code.",
      flag: false,
      pts: 13.3,
      group: "dep"
    },
    {
      text: "Application resembles (at least 90%) screenshots provided in challenge instructions.",
      flag: false,
      pts: 15,
      group: "qual"
    },
    {
      text: "Repository has a unique name.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository follows best practices for file structure and naming conventions.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository contains multiple descriptive commit messages.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository contains a quality README file with description, screenshot, and link to deployed application.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    ]
  },
  02: {
    title: "Advanced CSS Challenge: Professional Portfolio",
    criteria: [{
      text: "Satisfies all of the preceding acceptance criteria. (Has code, unique name, includes readme, does not have starter code",
      pts: 40,
      group: "tac"
    },
    {
      text: "Application deployed at live URL.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application loads with no errors.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application GitHub URL submitted.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "GitHub repository contains application code.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application resembles the mock-up functionality provided in the Challenge instructions.",
      flag: false,
      pts: 15,
      group: "qual"
    },
    {
      text: "Repository has a unique name.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository follows best practices for file structure and naming conventions.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository contains multiple descriptive commit messages.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository contains a quality readme with description, screenshot, link to deployed application.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    ]
  },
  03: {
    title: "JavaScript Challenge: Password Generator",
    criteria: [{
      text: "The Challenge should not produce any errors in the console when you inspect it using Chrome DevTools.",
      flag: false,
      pts: 40,
      group: "tac"
    },
    {
      text: "Application deployed at live URL.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application loads with no errors.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application GitHub URL submitted.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "GitHub repository that contains application code.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application user experience is intuitive and easy to navigate.",
      flag: false,
      pts: 5,
      group: "qual"
    },
    {
      text: "Application user interface style is clean and polished.",
      flag: false,
      pts: 5,
      group: "qual"
    },
    {
      text: "Application resembles the mock-up functionality provided in the Challenge instructions.",
      flag: false,
      pts: 5,
      group: "qual"
    },
    {
      text: "Repository has a unique name.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository follows best practices for file structure and naming conventions.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository contains multiple descriptive commit messages.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository contains a quality README file with description, screenshot, and link to deployed application.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    ]
  },
  04: {
    title: "Web APIs Challenge: Code Quiz",
    criteria: [{
      text: "Satisfies all of the above acceptance criteria.",
      flag: false,
      pts: 40,
      group: "tac"
    },
    {
      text: "Application deployed at live URL.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application loads with no errors.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application GitHub URL submitted.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "GitHub repository that contains application code.",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application user experience is intuitive and easy to navigate.",
      flag: false,
      pts: 0,
      group: "qual"
    },
    {
      text: "Application user interface style is clean and polished.",
      flag: false,
      pts: 0,
      group: "qual"
    },
    {
      text: "Application resembles the mock-up functionality provided in the Challenge instructions.",
      flag: false,
      pts: 0,
      group: "qual"
    },
    {
      text: "Repository has a unique name.",
      flag: false,
      pts: 0,
      group: "rep"
    },
    {
      text: "Repository follows best practices for file structure and naming conventions.",
      flag: false,
      pts: 0,
      group: "rep"
    },
    {
      text: "Repository follows best practices for class/id naming conventions, indentation, high-quality comments, etc.",
      flag: false,
      pts: 0,
      group: "rep"
    },
    {
      text: "Repository contains multiple descriptive commit messages.",
      flag: false,
      pts: 0,
      group: "rep"
    },
    {
      text: "Repository contains a high-quality README file with description, screenshot, and link to deployed application.",
      flag: false,
      pts: 0,
      group: "rep"
    },
    ]
  },
  09: {
    title: "Node.js Challenge: Professional README Generator",
    criteria: [{
      text: "A sample README generated using the application must be submitted.",
      flag: false,
      pts: 10,
      group: "del"
    },
    {
      text: "Your GitHub repository containing your application code.",
      flag: false,
      pts: 10,
      group: "del"
    },
    {
      text: "A walkthrough video that demonstrates the functionality of the README generator must be submitted and a link to the video should be included in your README file.",
      flag: false,
      pts: 6.75,
      group: "vid"
    },
    {
      text: "The walkthrough video must demonstrate how a user would invoke the application from the command line.",
      flag: false,
      pts: 6.75,
      group: "vid"
    },
    {
      text: "The walkthrough video must demonstrate how a user would enter responses to all of the prompts in the application.",
      flag: false,
      pts: 6.75,
      group: "vid"
    },
    {
      text: "The walkthrough video must demonstrate a generated README that matches the user input and has a functioning table of contents.",
      flag: false,
      pts: 6.75,
      group: "vid"
    },
    {
      text: "Uses the Inquirer package (Links to an external site.).",
      flag: false,
      pts: 40,
      group: ""
    },
    {
      text: "Repository has a unique name.",
      flag: false,
      pts: 2.6,
      group: "qual"
    },
    {
      text: "Repository follows best practices for file structure and naming conventions.",
      flag: false,
      pts: 2.6,
      group: "qual"
    },
    {
      text: "Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.",
      flag: false,
      pts: 2.6,
      group: "qual"
    },
    {
      text: "Repository contains multiple descriptive commit messages.",
      flag: false,
      pts: 2.6,
      group: "qual"
    },
    {
      text: "Repository contains a high-quality README with description and a link to walkthrough video.",
      flag: false,
      pts: 2.6,
      group: "qual"
    },
    ]
  },
  19: {
    title: "Progressive Web Applications (PWA) Challenge: Text Editor",
    criteria: [{
      text: "Can install locally, saves messages in indexDB",
      flag: false,
      pts: 40,
      group: "tac"
    },
    {
      text: "Application deployed to Heroku at live URL with build scripts",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application loads with no errors",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application GitHub URL submitted",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "GitHub repo contains application code",
      flag: false,
      pts: 8,
      group: "dep"
    },
    {
      text: "Application user experience is intuitive and easy to navigate",
      flag: false,
      pts: 5,
      group: "qual"
    },
    {
      text: "Application user interface style is clean and polished",
      flag: false,
      pts: 5,
      group: "qual"
    },
    {
      text: "Application resembles the mock-up functionality provided in the Challenge instructions",
      flag: false,
      pts: 5,
      group: "qual"
    },
    {
      text: "Repository has a unique name",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository follows best practices for file structure and naming conventions",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository contains multiple descriptive commit messages",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    {
      text: "Repository contains a quality README file with description, screenshot, and link to deployed application",
      flag: false,
      pts: 2.6,
      group: "rep"
    },
    ]
  }
}