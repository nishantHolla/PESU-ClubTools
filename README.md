# PESU_ClubTools

PESU Sem 3: Mini project for Web Tech.

# Team Members

Nishant Holla - PES1UG23CS401 </br>
Pranav Hemanth - PES1UG23CS433 </br>
Aneesh Dutt - PES1UG23CS371 </br>
Nagarjun A H - PES1UG23CS375 </br>

## Setup

1. Generate a new ssh key and add it to github
[Follow this video](https://www.youtube.com/watch?v=O5H_KFzla6M)

2. Clone the repo

```bash
git clone git@github.com:nishantHolla/PESU_ClubTools.git
cd PESU_ClubTools
```

2. Install backend dependencies

```bash
npm install --prefix ./backend
```

3. Install frontend dependencies

```bash
npm install --prefix ./frontend
```

4. Start backend server

```bash
cd ./backend
npm run dev
```

5. Start frontend server - Open new terminal and cd into the frontend folder

```bash
cd ./frontend
npm run dev
```

6. Check setup - open [http://localhost:5173](http://localhost:5173) in browser and click ping server button

7. To check if you are able to push changes to github, edit this README.md file with some new text (it can be anything).
And then push the changes to github

```bash
git config --global user.email "change this with your github email id"
git config --global user.name "change this with your github username"
git add README.md
git commit -m "Updated the readme file"
git push origin main
```
