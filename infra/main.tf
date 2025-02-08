# Load AWS Provider
provider "aws" {
  region = "us-east-1"
}

# Include Networking (VPC, Subnets, Security Groups)
module "networking" {
  source = "./vpc.tf"
}

# Include Backend (NestJS) - ECS, ALB, RDS
module "backend" {
  source = "./backend.tf"
}

# Include Frontend (React) - S3, CloudFront
module "frontend" {
  source = "./frontend.tf"
}
