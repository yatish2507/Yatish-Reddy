resource "aws_vpc" "csye6225_vpc" {
  cidr_block = var.vpc_cidr

  tags = {
    Name = "csye6225-vpc"
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}