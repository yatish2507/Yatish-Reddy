#!/bin/bash
# install_cloudwatch_agent.sh
set -e

# Download and install the Amazon CloudWatch Agent
echo "Downloading and installing Amazon CloudWatch Agent..."
curl -O https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
rm amazon-cloudwatch-agent.deb
echo "Amazon CloudWatch Agent installed successfully."