#!/bin/bash
set -e

# Move systemd service file
sudo cp /tmp/scripts/csye6225.service /etc/systemd/system/csye6225.service

# Reload systemd to recognize the new service, enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable csye6225