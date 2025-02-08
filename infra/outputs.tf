output "backend_url" {
  value = aws_lb.backend_alb.dns_name
}

output "frontend_url" {
  value = aws_cloudfront_distribution.react_cdn.domain_name
}
