# Create a public route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.csye6225_vpc.id

  tags = {
    Name = "csye6225-public-route-table"
  }
}

# Create a private route table
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.csye6225_vpc.id

  tags = {
    Name = "csye6225-private-route-table"
  }
}

# Create a route in the public route table for internet access
resource "aws_route" "public_internet_access" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0" # Route all traffic to the Internet Gateway
  gateway_id             = aws_internet_gateway.csye6225_internet_gateway.id
}
