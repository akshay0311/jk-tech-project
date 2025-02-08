# ECS Cluster
resource "aws_ecs_cluster" "backend_cluster" {
  name = "nestjs-cluster"
}

# ECS Task Definition
resource "aws_ecs_task_definition" "nestjs_task" {
  family                   = "nestjs-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  memory                   = "512"
  cpu                      = "256"
  container_definitions = jsonencode([
    {
      name  = "nestjs-app"
      image = "123456789012.dkr.ecr.us-east-1.amazonaws.com/nestjs-app:latest"
      portMappings = [{ containerPort = 3000 }]
    }
  ])
}

# ECS Service
resource "aws_ecs_service" "nestjs_service" {
  cluster         = aws_ecs_cluster.backend_cluster.id
  task_definition = aws_ecs_task_definition.nestjs_task.arn
  launch_type     = "FARGATE"
  network_configuration {
    subnets = [aws_subnet.public_subnet.id]
    security_groups = [aws_security_group.backend_sg.id]
    assign_public_ip = true
  }
}

# Application Load Balancer (ALB)
resource "aws_lb" "backend_alb" {
  name               = "nestjs-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.backend_sg.id]
  subnets           = [aws_subnet.public_subnet.id]
}

# ALB Listener
resource "aws_lb_listener" "backend_listener" {
  load_balancer_arn = aws_lb.backend_alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }
}
