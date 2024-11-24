locals {
  az_count = min(3, length(data.aws_availability_zones.available.names))

  availability_zones = slice(data.aws_availability_zones.available.names, 0, local.az_count)

  public_subnet_cidrs = {
    for index, az in local.availability_zones :
    az => cidrsubnet(var.vpc_cidr, 4, index * 2)
  }

  private_subnet_cidrs = {
    for index, az in local.availability_zones :
    az => cidrsubnet(var.vpc_cidr, 4, index * 2 + 1)
  }
}