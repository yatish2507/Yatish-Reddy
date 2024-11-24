# Create an Internet Gateway and attach it to the VPC
resource "aws_internet_gateway" "csye6225_internet_gateway" {
  vpc_id = aws_vpc.csye6225_vpc.id # Reference the VPC ID

  tags = {
    Name = "csye6225-internet-gateway" # Tag for identification
  }
}
