resource "aws_lambda_function" "user_verification_function" {
  function_name = "user_verification_lambda"
  role          = aws_iam_role.lambda_execution_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.8"
  timeout       = 60

  filename = "${path.module}/../lambda_func.zip"

  environment {
    variables = {
      SENDGRID_API_NAME = var.api_key
      DOMAIN_NAME       = var.domain_name
      FROM_EMAIL        = var.sendgrid_email
    }
  }
}

output "lambda_function_arn" {
  value = aws_lambda_function.user_verification_function.arn
}

resource "aws_lambda_permission" "allow_sns" {
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.user_verification_function.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.user_registration.arn
}

resource "aws_sns_topic_subscription" "lambda_subscription" {
  topic_arn = aws_sns_topic.user_registration.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.user_verification_function.arn
}
