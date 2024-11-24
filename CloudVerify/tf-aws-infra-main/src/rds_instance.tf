resource "aws_db_instance" "csye6225_rds_instance" {
  identifier             = "csye6225"
  allocated_storage      = 20
  instance_class         = "db.t3.micro"
  engine                 = "postgres"
  engine_version         = "16"
  username               = var.db_username
  password               = var.db_password
  db_name                = var.db_name
  publicly_accessible    = false
  vpc_security_group_ids = [aws_security_group.csye6225_rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.csye6225_rds_subnet_group.name
  parameter_group_name   = aws_db_parameter_group.csye6225_rds_pg.name

  skip_final_snapshot = true

  tags = {
    Name = "csye6225-rds-instance"
  }
}