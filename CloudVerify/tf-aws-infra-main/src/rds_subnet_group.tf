resource "aws_db_subnet_group" "csye6225_rds_subnet_group" {
  name       = "csye6225-rds-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "csye6225-rds-subnet-group"
  }
}
