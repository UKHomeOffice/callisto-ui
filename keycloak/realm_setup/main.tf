terraform {
  required_providers {
    keycloak = {
      source  = "mrparkers/keycloak"
      version = "~> 3.8.1"
    }
  }

}

provider "keycloak" {
    client_id = "admin-cli"
    username  = "admin"
    password  = "admin"
}

resource "keycloak_realm" "callisto_notprod_auth" {
  realm             = "callisto-notprod-auth"
  enabled           = true
  display_name      = "Callisto Auth (notprod)"
  display_name_html = "Callisto <b>NOT</b> production"


  access_code_lifespan = "1h"

  ssl_required = "external"
  attributes = {
  }

  web_authn_policy {
    relying_party_entity_name = "keycloak"
    signature_algorithms      = ["ES256"]
  }
}


resource "keycloak_openid_client" "terraform_openid_client_callisto" {
  realm_id = keycloak_realm.callisto_notprod_auth.id

  client_id     = "terraform-client-callisto"
  client_secret = "4445b95efe335ed5b86478549ee1f1c5631537f4c9b4d7db9b3c924f66c8b10f"
  name          = "Terraform client Callisto"
  enabled       = true

  access_type                  = "CONFIDENTIAL"
  standard_flow_enabled        = false
  direct_access_grants_enabled = false
  service_accounts_enabled     = true

}

data "keycloak_openid_client" "realm_management" {
  realm_id  = keycloak_realm.callisto_notprod_auth.id
  client_id = "realm-management"
}

locals {
  roles = [
    "manage-realm",
    "realm-admin",
    "manage-identity-providers"
  ]
}

data "keycloak_role" "required" {
  for_each  = toset(local.roles)
  realm_id  = keycloak_realm.callisto_notprod_auth.id
  client_id = data.keycloak_openid_client.realm_management.id
  name      = each.key
}

resource "keycloak_openid_client_service_account_role" "client2_service_account_role" {
  for_each                = data.keycloak_role.required
  realm_id                = keycloak_realm.callisto_notprod_auth.id
  service_account_user_id = keycloak_openid_client.terraform_openid_client_callisto.service_account_user_id
  client_id               = data.keycloak_openid_client.realm_management.id
  role                    = each.value.name
}
