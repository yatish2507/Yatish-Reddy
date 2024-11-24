#!/bin/bash
# Install and set up StatsD

# Install dependencies
sudo apt-get update -y
sudo apt-get install -y nodejs npm

# Install StatsD
sudo npm install -g statsd

# Create a systemd service for StatsD
sudo tee /etc/systemd/system/statsd.service > /dev/null <<EOL
[Unit]
Description=StatsD
After=network.target

[Service]
ExecStart=/usr/bin/statsd /etc/statsd/config.js
Restart=always

[Install]
WantedBy=multi-user.target
EOL

# Reload systemd and start StatsD
sudo systemctl daemon-reload
sudo systemctl start statsd
sudo systemctl enable statsd

echo "StatsD installation and setup complete."