resource "aws_launch_template" "csye6225_launch_template" {
  name_prefix            = "csye6225_asg_template"
  image_id               = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.csye6225_sg.id]

  iam_instance_profile {
    name = aws_iam_instance_profile.s3_access_instance_profile.name
  }
  # network_interfaces {
  #   associate_public_ip_address = true
  #   security_groups             = [aws_security_group.csye6225_sg.id]
  # }

  user_data = base64encode(<<-EOF
  #!/bin/bash
  set -e
  sudo apt-get update -y
  sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a start

  # Set up environment variables for the application
  cat <<EOL > /opt/webapp/.env
  DB_USERNAME=${var.db_username}
  DB_PASSWORD=${var.db_password}
  DB_HOST=${aws_db_instance.csye6225_rds_instance.address}
  DB_NAME=${var.db_name}
  BUCKET_NAME=${aws_s3_bucket.webapp_bucket.bucket}
  SENDGRID_API_KEY=${var.api_key}
  SNS_TOPIC_ARN=${aws_sns_topic.user_registration.arn}
  EOL

  sudo systemctl daemon-reload
  sudo systemctl start csye6225.service
  sudo systemctl enable csye6225.service
EOF
  )

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "dev_subdomain" {
  zone_id = var.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.csye6225_alb.dns_name
    zone_id                = aws_lb.csye6225_alb.zone_id
    evaluate_target_health = true
  }
}