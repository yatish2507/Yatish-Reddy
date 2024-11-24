resource "aws_lb" "csye6225_alb" {
  name               = "csye6225-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.csye6225_lb_sg.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = false

  tags = {
    Name = "csye6225-alb"
  }
}

resource "aws_lb_listener" "csye6225_listener" {
  load_balancer_arn = aws_lb.csye6225_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.csye6225_target_group.arn
  }
}