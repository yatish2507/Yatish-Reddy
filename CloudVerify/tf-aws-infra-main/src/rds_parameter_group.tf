resource "aws_db_parameter_group" "csye6225_rds_pg" {
  name   = "csye6225-rds-pg"
  family = "postgres16"

  description = "Custom parameter group for RDS instance"

  parameter {
    name  = "log_min_duration_statement"
    value = "1000"
  }

  tags = {
    Name = "csye6225-db-parameter-group"
  }
}
