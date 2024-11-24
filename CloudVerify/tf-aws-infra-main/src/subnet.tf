resource "aws_subnet" "public" {
  count                   = local.az_count
  vpc_id                  = aws_vpc.csye6225_vpc.id
  cidr_block              = local.public_subnet_cidrs[local.availability_zones[count.index]]
  availability_zone       = local.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "csye6225-public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count             = local.az_count
  vpc_id            = aws_vpc.csye6225_vpc.id
  cidr_block        = local.private_subnet_cidrs[local.availability_zones[count.index]]
  availability_zone = local.availability_zones[count.index]

  tags = {
    Name = "csye6225-private-subnet-${count.index + 1}"
  }
}
