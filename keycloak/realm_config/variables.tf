variable "base_url" {
  type        = string
  description = "The base url for the keycloak server to target"
  sensitive   = true
}

variable "client_id" {
  type        = string
  description = "The ID of the keycloak client"
  sensitive   = true
}

variable "client_name" {
  type        = string
  description = "The name of the keycloak client"
  sensitive   = true
}