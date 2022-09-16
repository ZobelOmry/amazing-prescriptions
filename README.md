# The most amazing prescriptions app ever

Are you taking a lot of drugs every day?? Do you experience any weird symptoms?? Have you ever considered that some combination of them might have harmful interactions?

No more!

Here comes the Prescriptions app!
One web app to help you understand all drug interactions! It's everything the physicians have dreamed of

It's as easy as pie.

1. Type in a drug you want to prescribe (we'll auto-complete it with an actual drug).
2. Add the drug to the prescription list.
3. (optional) Set a date for the prescription.
4. You will automatically get alerts for harmful drug interactions! Amazing!!
5. All the prescriptions are saved in your local storage (so it will persist between refreshes).

**We are not responsible for any real drug problems or drug abuse.

![walterWhite](https://user-images.githubusercontent.com/44494570/190483145-5dd8b55a-ae11-44f4-b3fe-f6591164007f.gif)


Some editorial comments:
* I've used antd as a UI library - therefore the design is not exactly as in the wireframes (I've taken some liberty with it).
* The drug search returns more than one drug code per drug - I've used only the first one to check for drug interactions.
* I haven't been able to see any severities on drug interactions other than N/A - I did prepare an "AC preparation" for other severities.
* I create the project using `create-react-app` because react.js is my go to, and `create-react-app` is an easy way to bootstrap a react app.
* This app has no need for presistancy or any other feature that a backend server is a must for - therefore I've decided to encapsulate all of the logic in the client.



## Instructions

1. Clone the repo locally
2. `npm i`
3. `npm start` and see the magic happen [http://localhost:3000](http://localhost:3000)



![image](https://user-images.githubusercontent.com/44494570/190622488-33b680a0-5621-48f6-8ab2-59f73c98355c.png)

