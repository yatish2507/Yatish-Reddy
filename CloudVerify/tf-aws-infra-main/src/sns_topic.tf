resource "aws_sns_topic" "user_registration" {
  name = "user_registration"
}

output "sns_topic_arn" {
  value = aws_sns_topic.user_registration.arn
}