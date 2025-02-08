# Create S3 Bucket
resource "aws_s3_bucket" "react_bucket" {
  bucket = var.frontend_bucket
}

# Enable Static Website Hosting
resource "aws_s3_bucket_website_configuration" "react_website" {
  bucket = aws_s3_bucket.react_bucket.id
  index_document { suffix = "index.html" }
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "react_cdn" {
  origin {
    domain_name = aws_s3_bucket.react_bucket.bucket_regional_domain_name
    origin_id   = "S3Origin"
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"
    viewer_protocol_policy = "redirect-to-https"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
