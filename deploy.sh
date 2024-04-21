#!/bin/bash
distribution="EROO7XKKI363S"
bucket="s3://libra-customresourcestack-tn8w1bls2f-s3bucketroot-5saolti5l3l2"

# cloudformation deploy
# aws --region us-east-1 cloudformation deploy --stack-name libra --template-file ./ci/template.yaml --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --parameter-overrides DomainName=tonz.io SubDomain=libra HostedZoneId=Z0647044GG15YFJEKM CreateApex=no
# aws cloudfront get-distribution-config --id $distribution > distribution-config.json
# etag=$(jq -r ".ETag" < distribution-config.json)
# jq '.DistributionConfig.DefaultCacheBehavior.ResponseHeadersPolicyId = "60669652-455b-4ae9-85a4-c4c02393f86c" | .DistributionConfig' < distribution-config.json > new-config.json
# aws cloudfront update-distribution --id $distribution --distribution-config file://new-config.json --if-match $etag
# rm distribution-config.json
# rm new-config.json
## NEED TO RE-APPLY OAI to the S3 Origin?

# website deploy
npm ci
npm run build
aws s3 sync "./dist" "$bucket"

# invalidation
aws cloudfront create-invalidation --distribution-id=$distribution --path="/*"