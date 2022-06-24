terraform {
  required_providers {
    keycloak = {
      source  = "mrparkers/keycloak"
      version = "~> 3.8.1"
    }
  }
}

provider "keycloak" {
  # Variables in here must be defined locally before running the plan
  # client_id = $KEYCLOAK_CLIENT_ID
  # client_secret = $KEYCLOAK_CLIENT_SECRET 
  # realm = $KEYCLOAK_REALM (will default to master)
  # url = $KEYCLOAK_URL
}

data "keycloak_realm" "callisto_notprod_auth" {
  realm = "callisto-dev"
}


resource "keycloak_openid_client" "callisto_ui" {
  realm_id = data.keycloak_realm.callisto_notprod_auth.id

  client_id = var.client_id
  name      = var.client_name
  enabled   = true

  access_type = "PUBLIC"

  standard_flow_enabled = true
  direct_access_grants_enabled = false
  service_accounts_enabled     = false
  root_url = var.base_url
  admin_url = var.base_url
  web_origins = [
    var.base_url
  ]
  valid_redirect_uris = [
    "/*"
  ]
}