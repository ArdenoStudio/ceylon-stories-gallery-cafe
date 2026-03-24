#!/bin/bash
# Ardeno OS - Batch GCP Project Creation & Key Generation

# Pre-requisite: gcloud CLI must be installed and initialized.
# This script provisions 5 projects per Google Account, enables Gemini API, and extracts API keys.

ACCOUNTS=("client1@ardeno.studio" "client2@ardeno.studio") # Replace with the 10 accounts
PROJECTS_PER_ACCOUNT=5
API_SERVICE="generativelanguage.googleapis.com" # Gemini API

mkdir -p "tmp_keys"

echo "Starting Ardeno OS Auto-Provisioning for Free-Tier LLM Pool..."

for account in "${ACCOUNTS[@]}"; do
    echo "Switching active account to: $account"
    # gcloud config set account $account
    # Note: Ensure the account is authenticated via gcloud auth login first.

    for i in $(seq 1 $PROJECTS_PER_ACCOUNT); do
        PROJECT_ID="ardeno-gemini-pool-$(openssl rand -hex 4)-$i"
        
        echo "Creating GCP Project: $PROJECT_ID..."
        gcloud projects create $PROJECT_ID --name="Ardeno Key Pool Node $i" --quiet
        
        echo "Linking billing account (Required if Free-Tier has limits, though Gemini API is mostly free..."
        # gcloud beta billing projects link $PROJECT_ID --billing-account=YOUR_BILLING_ID
        
        echo "Enabling Gemini API for $PROJECT_ID..."
        gcloud services enable $API_SERVICE --project=$PROJECT_ID --quiet
        
        echo "Generating API Key..."
        # Experimental gcloud alpha or REST execution to create an API key
        # gcloud alpha services api-keys create --project=$PROJECT_ID --display-name="NodeKey-$i"
        
        # In a real environment, you'd extract the key string here:
        # KEY_STRING=$(gcloud alpha services api-keys list --project=$PROJECT_ID --format="value(keyString)")
        
        echo "Project: $PROJECT_ID | Key: [MOCK_KEY]" >> tmp_keys/raw_keys.txt
    done
done

echo "Batch setup complete. Keys dumped to tmp_keys/raw_keys.txt for encryption."
