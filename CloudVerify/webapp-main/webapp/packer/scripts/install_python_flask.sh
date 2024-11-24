#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive
export CHECKPOINT_DISABLE=1

# Update and install Python and Flask
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y python3 python3-pip
pip3 install Flask
