# DevOps Login Dashboard

Simple demo app: register/login + session-based dashboard.
Tech: Node.js, Express, bcrypt, express-session, Docker.

## Run locally
1. Install Node.js & npm
2. npm install
3. node app.js
4. Visit: http://localhost:3000

## Docker (build & run)
Build:
  docker build -t devops-login-dashboard .

Run (simple):
  docker run -d -p 3000:3000 --name devops-login-dashboard \
    -e SESSION_SECRET="replace_with_secure_value" \
    devops-login-dashboard

To persist users, mount a local volume:
  docker run -d -p 3000:3000 --name devops-login-dashboard \
    -v $(pwd)/users.json:/app/users.json \
    -e SESSION_SECRET="replace_with_secure_value" \
    devops-login-dashboard

## Deploy to EC2 (high-level)
1. SSH into EC2
2. Install docker (sudo apt update && sudo apt install docker.io -y)
3. git clone your repo
4. cd repo
5. docker build -t devops-login-dashboard .
6. docker run -d -p 3000:3000 --name devops-login-dashboard \
     -v $(pwd)/users.json:/app/users.json \
     -e SESSION_SECRET="YOUR_SECURE_SECRET" \
     --restart unless-stopped \
     devops-login-dashboard

Open: http://EC2_PUBLIC_IP:3000

