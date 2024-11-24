variable "aws_region" {
  description = "The AWS region to deploy resources"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "ami_id" {
  description = "The AMI ID to use for launching the EC2 instance"
  type        = string
}

variable "key_name" {
  description = "The name of the EC2 key pair for SSH access"
  type        = string
}

variable "instance_type" {
  description = "Type of EC2 instance"
  default     = "t2.micro"
}

variable "db_username" {
  description = "The database username"
}

variable "db_password" {
  description = "The database password"
}

variable "db_name" {
  description = "The database name"
}

variable "domain_name" {
  description = "The root domain name"
  type        = string
}

variable "app_port" {
  description = "The port on which the application listens"
  type        = number
  default     = 5000
}

variable "api_key" {
  description = "Send Grid API key"
  type        = string
}

variable "zone_id" {
  description = "Hosted Zone ID"
  type        = string
}

variable "sendgrid_email" {
  description = "The SES verified email address for sending emails"
}