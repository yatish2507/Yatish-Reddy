packer {
  required_plugins {
    amazon = {
      version = ">= 1.2.8, < 2.0.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

# AWS Region
variable "aws_region" {
  default = "us-east-1"
}

variable "demo_user" {
  description = "The demo AWS account ID"
  default     = "490004639971"
}

# VPC ID where the instance will be launched
variable "aws_vpc_id" {
  description = "The default VPC ID where the instance will be launched"
  default     = "vpc-0a24f27cf09048244"
}

# Subnet ID where the instance will be launched
variable "aws_subnet_id" {
  description = "The default VPC subnet ID"
  default     = "subnet-00179e0040e448b80"
}

# Instance Type
variable "instance_type" {
  default = "t2.micro"
}

# AMI Owner ID for Ubuntu images
variable "ami_owner_id" {
  default = "099720109477"
}

source "amazon-ebs" "ubuntu" {
  ami_name      = "custom-python-flask-db-image-{{timestamp}}"
  instance_type = var.instance_type
  region        = var.aws_region
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = [var.ami_owner_id, var.demo_user]
  }
  ssh_username = "ubuntu"
  ami_users    = [var.demo_user]
  vpc_id       = var.aws_vpc_id
  subnet_id    = var.aws_subnet_id
}

build {
  sources = ["source.amazon-ebs.ubuntu"]

  # Update the OS
  provisioner "shell" {
    script = "${path.root}/scripts/updateOS.sh"
  }

  # Copy the CloudWatch Agent installation script
  provisioner "file" {
    source      = "${path.root}/scripts/install_cloudwatch.sh"
    destination = "/tmp/install_cloudwatch.sh"
  }

  # Copy and run the StatsD installation script
  provisioner "file" {
    source      = "${path.root}/scripts/install_statsd.sh"
    destination = "/tmp/install_statsd.sh"
  }

  # Copy the CloudWatch Agent JSON configuration file
  provisioner "file" {
    source      = "${path.root}/scripts/amazon-cloudwatch-agent.json"
    destination = "/tmp/amazon-cloudwatch-agent.json"
  }

  # Copy the web application code as a zip
  provisioner "file" {
    source      = "${path.root}/../../webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  # Copy the app setup script
  provisioner "file" {
    source      = "${path.root}/scripts/setup_app.sh"
    destination = "/tmp/setup_app.sh"
  }

  # Copy the system setup script
  provisioner "file" {
    source      = "${path.root}/scripts/setup.sh"
    destination = "/tmp/setup.sh"
  }

  # Copy the systemd service file for the app
  provisioner "file" {
    source      = "${path.root}/scripts/csye6225.service"
    destination = "/tmp/csye6225.service"
  }

  # Shell commands to set up the environment, services, and execute scripts
  provisioner "shell" {
    inline = [
      "export DEBIAN_FRONTEND=noninteractive",
      "export CHECKPOINT_DISABLE=1",

      # Install and configure CloudWatch Agent
      "chmod +x /tmp/install_cloudwatch.sh",
      "/tmp/install_cloudwatch.sh",

      # Move the CloudWatch configuration file to the required location with sudo
      "sudo mkdir -p /opt/aws/amazon-cloudwatch-agent/etc",
      "sudo mv /tmp/amazon-cloudwatch-agent.json /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json",

      # Install and configure StatsD
      "chmod +x /tmp/install_statsd.sh",
      "/tmp/install_statsd.sh",

      # Move the systemd service file for the app
      "sudo mv /tmp/csye6225.service /etc/systemd/system/csye6225.service",

      # Create a new group and user
      "sudo groupadd csye6225 || true",
      "sudo useradd -r -M -s /usr/sbin/nologin -g csye6225 csye6225 || true",
      "echo 'csye6225 ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/csye6225",

      # Create and set permissions for the log file
      "sudo touch /var/log/webapp_routes.log",
      "sudo chown csye6225 /var/log/webapp_routes.log",
      "sudo chmod 664 /var/log/webapp_routes.log",

      # Make setup_app.sh executable and run it
      "chmod +x /tmp/setup_app.sh",
      "sudo -u csye6225 /tmp/setup_app.sh",

      # Make setup.sh executable and run it
      "chmod +x /tmp/setup.sh",
      "/tmp/setup.sh"
    ]
  }

  provisioner "shell" {
    inline = ["sudo apt-get clean"]
  }
}