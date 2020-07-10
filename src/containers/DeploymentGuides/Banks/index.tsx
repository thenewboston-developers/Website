import React from 'react';

import Commands from 'components/Commands';

const Banks = () => {
  const render01InstallDependencies = () => (
    <>
      <h2>Install Dependencies</h2>

      <Commands
        code={`sudo apt -y update && sudo apt -y upgrade
sudo apt -y install build-essential nginx python3-pip redis-server
`}
        comment="Update and install packages"
      />
    </>
  );

  const render02Firewall = () => (
    <>
      <h2>Firewall</h2>

      <Commands
        code={`sudo ufw app list
sudo ufw allow 'Nginx Full' && sudo ufw allow OpenSSH && sudo ufw enable
`}
        comment="Enable firewall"
      />
      <Commands
        code={`sudo ufw status && systemctl status nginx`}
        comment="Verify that firewall is active and nginx is running"
      />

      <p>You should now be able to visit your server's public IP address and see the welcome page.</p>

      <Commands code={`adduser deploy`} comment="First log in as root, then create the new user" />
      <Commands
        code={`Apples123!`}
        comment="Fill the form and set the password (use different, more secure password after guide is finished)"
      />
      <Commands code={`visudo`} comment="Allow this user to use sudo" />
      <Commands code={`deploy ALL=(ALL) NOPASSWD:ALL`} comment="Add following line into the opened edit" />
      <Commands code={`su - deploy`} comment="Then switch to this new user" />
    </>
  );

  const render03ProjectSetup = () => (
    <>
      <h2>Project Setup</h2>

      <Commands code={`ssh-keygen -t rsa -b 4096 -C "buckyroberts@gmail.com"`} comment="Generate SSH key pair" />
      <Commands code={`cat ~/.ssh/id_rsa.pub`} comment="Display SSH key in console" />

      <p>
        Add your SSH key to GitHub: <a href="https://github.com/settings/keys">https://github.com/settings/keys</a>
      </p>

      <Commands code={`ssh -T git@github.com`} comment="Test connection" />
      <Commands code={`sudo chmod go+w /var/www`} comment="Update /var/www/ permissions" />
      <Commands
        code={`cd
git clone git@github.com:thenewboston-developers/Validator.git /var/www/Validator
cd /var/www/Validator/
`}
        comment="Clone project to server"
      />
      <Commands
        code={`nano requirements/local.txt
# Remove first requirement (private GitHub repo)
sudo pip3 install -r requirements/local.txt`}
        comment="Temp 1/2"
      />
      <Commands
        code={`cd /var/www/
git clone git@github.com:thenewboston-developers/thenewboston-python.git
cd /var/www/Validator/
sudo pip3 install file:///var/www/thenewboston-python/dist/thenewboston-0.0.1.tar.gz
`}
        comment="Temp 2/2"
      />
    </>
  );

  const render04NGINX = () => (
    <>
      <h2>NGINX</h2>

      <Commands
        code={`sudo rm /etc/nginx/sites-available/default
sudo nano /etc/nginx/sites-available/default
`}
        comment="Create NGINX configuration"
      />
      <Commands
        code={`upstream django {
\tserver 127.0.0.1:8001;
}

server {
\tlisten 80 default_server;
\tserver_name localhost;
\tcharset utf-8;
\tclient_max_body_size 75M;

\t# Django media
\tlocation /media {
\t\talias /var/www/Validator/media;
\t}

\tlocation /static {
\t\talias /var/www/Validator/static;
\t}

\t# Send all non-media requests to the Django server
\tlocation / {
\t\tuwsgi_pass django;
\t\tinclude /var/www/Validator/uwsgi_params;
\t}

}
`}
        comment="Paste in the following and save"
      />
      <Commands code={`sudo nginx -t`} comment="Test configuration" />
    </>
  );

  const render05Redis = () => (
    <>
      <h2>Redis</h2>

      <Commands
        code={`sudo nano /etc/redis/redis.conf`}
        comment="Since we are running Ubuntu, which uses the systemd init system, change this to systemd"
      />
      <Commands
        code={`# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd`}
        comment="Update the following line in the configuration and save file"
      />
      <Commands
        code={`sudo systemctl restart redis.service`}
        comment="Restart the Redis service to reflect the changes you made to the configuration file"
      />
      <Commands code={`sudo systemctl status redis`} comment="Check status to make sure Redis is running correctly" />
    </>
  );

  const render06systemd = () => (
    <>
      <h2>systemd</h2>

      <Commands code={`sudo nano /usr/local/bin/start_api.sh`} comment="Create script to run uwsgi" />
      <Commands
        code={`#!/bin/bash

cd /var/www/Validator
uwsgi --ini app.ini
`}
        comment="Paste in the following and save"
      />
      <Commands code={`sudo chmod a+x /usr/local/bin/start_api.sh`} comment="Update permissions for shell script" />
    </>
  );

  const render07Celery = () => (
    <>
      <h2>Celery</h2>

      <Commands
        code={`cd /etc/
sudo mkdir validator
sudo mkdir /var/log/celery
sudo chown deploy /var/log/celery
sudo nano /etc/validator/environment
`}
        comment="Create a file to contain our environment variables"
      />
      <Commands
        code={`DJANGO_APPLICATION_ENVIRONMENT=local
NETWORK_SIGNING_KEY=6f812a35643b55a77f71c3b722504fbc5918e83ec72965f7fd33865ed0be8f81
`}
      />
      <Commands code={`sudo nano /etc/validator/celery.conf`} comment="Create celery env config" />
      <Commands
        code={`CELERYD_NODES="w1"
CELERY_BIN="/usr/local/bin/celery"
CELERY_APP="config.settings"
CELERYD_MULTI="multi"
CELERYD_OPTS="--time-limit=1800 --concurrency=2"
CELERYD_PID_FILE="/var/log/celery/%n.pid"
CELERYD_LOG_FILE="/var/log/celery/%n%I.log"
CELERYD_LOG_LEVEL="DEBUG"
DJANGO_APPLICATION_ENVIRONMENT=local`}
      />
      <Commands code={`sudo nano /etc/systemd/system/api.service`} comment="Create service" />
      <Commands
        code={`[Unit]
Description = Service to run Django API
After = network.target

[Service]
EnvironmentFile = /etc/validator/environment
User = deploy
ExecStart = /usr/local/bin/start_api.sh

[Install]
WantedBy = multi-user.target
`}
      />
      <Commands code={`sudo chmod a+x /etc/systemd/system/api.service`} comment="Update permissions for file" />
      <Commands code={`sudo nano /etc/systemd/system/celery.service`} comment="Create service for celery" />
      <Commands
        code={`[Unit]
Description=Validator Celery Service
After=network.target

[Service]
Type=forking
User=deploy
EnvironmentFile=/etc/validator/celery.conf
WorkingDirectory=/var/www/Validator
ExecStart=/bin/sh -c '\${CELERY_BIN} multi start \${CELERYD_NODES} \\
  -A \${CELERY_APP} --pidfile=\${CELERYD_PID_FILE} \\
  --logfile=\${CELERYD_LOG_FILE} --loglevel=\${CELERYD_LOG_LEVEL} \${CELERYD_OPTS}'
ExecStop=/bin/sh -c '\${CELERY_BIN} multi stopwait \${CELERYD_NODES} \\
  --pidfile=\${CELERYD_PID_FILE}'
ExecReload=/bin/sh -c '\${CELERY_BIN} multi restart \${CELERYD_NODES} \\
  -A \${CELERY_APP} --pidfile=\${CELERYD_PID_FILE} \\
  --logfile=\${CELERYD_LOG_FILE} --loglevel=\${CELERYD_LOG_LEVEL} \${CELERYD_OPTS}'

[Install]
WantedBy=multi-user.target
`}
      />
      <Commands
        code={`sudo systemctl daemon-reload && sudo systemctl enable api && sudo systemctl enable celery`}
        comment="Reload systemd and enable both services"
      />
      <Commands code={`ls /etc/systemd/system/multi-user.target.wants/`} comment="Verify it is enabled" />
    </>
  );

  const render08Services = () => (
    <>
      <h2>Services</h2>

      <Commands
        code={`sudo systemctl start api && sudo systemctl start celery && sudo systemctl restart nginx`}
        comment="Start API service, restart NGINX, and verify services are active"
      />
      <Commands code={`sudo systemctl status api celery nginx redis`} comment="Check the status of the services" />
    </>
  );

  const render09Application = () => (
    <>
      <h2>Static files and Application Configuration</h2>

      <Commands
        code={`nano ~/.profile
export DJANGO_APPLICATION_ENVIRONMENT="local"`}
        comment="Set environment variable"
      />

      <p>Log out and log back in</p>

      <Commands
        code={`cd /var/www/Validator/
python3 manage.py makemigrations && python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py collectstatic
`}
        comment="Set up database"
      />
      <Commands code={`python3 manage.py initialize_primary_validator`} comment="Initialize validator" />
      <Commands code={`http://[IP_ADDRESS]/config`} comment="Verify everything is working correctly by visiting" />
    </>
  );

  const render10Troubleshooting = () => (
    <>
      <h2>Troubleshooting</h2>

      <Commands code={`sudo systemctl status api celery nginx redis`} comment="Check the status of the services" />
      <Commands
        code={`sudo journalctl -u api.service
sudo journalctl -u celery.service
sudo journalctl -u nginx.service
`}
        comment="View the logs"
      />
    </>
  );

  return (
    <section>
      <h1 className="page-title">Banks</h1>
      <p>
        All banks have the option of connecting to other banks. Although it is not a requirement, it is often useful for
        a bank to inspect the trust levels assigned by other banks. This data is used primarily in determining which
        primary validator to elect as well as which confirmation validators to connect to and purchase services from.
      </p>
      {render01InstallDependencies()}
      {render02Firewall()}
      {render03ProjectSetup()}
      {render04NGINX()}
      {render05Redis()}
      {render06systemd()}
      {render07Celery()}
      {render08Services()}
      {render09Application()}
      {render10Troubleshooting()}
    </section>
  );
};

export default Banks;
