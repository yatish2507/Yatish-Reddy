#!/bin/bash
set -e

sudo apt-get install -y unzip
sudo unzip /tmp/webapp.zip -d /opt/webapp

echo "Contents of /opt/webapp:"
ls -al /opt/webapp

sudo apt-get install -y python3 python3-pip
sudo pip3 install -r /opt/webapp/webapp/requirements.txt