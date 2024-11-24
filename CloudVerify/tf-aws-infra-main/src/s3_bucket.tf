# Generate a random string for the bucket name
resource "random_id" "unique_suffix" {
  byte_length = 8
}

# Define the S3 bucket
resource "aws_s3_bucket" "webapp_bucket" {
  bucket        = "webapp-bucket-${random_id.unique_suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "default_encryption" {
  bucket = aws_s3_bucket.webapp_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "lifecycle_rule" {
  bucket = aws_s3_bucket.webapp_bucket.id
  rule {
    id = "TransitionToIA"
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    status = "Enabled"
  }
}