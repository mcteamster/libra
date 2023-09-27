#!/bin/bash
aws --region us-east-1 cloudformation deploy --stack-name libra --template-file ./ci/template.yaml --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --parameter-overrides DomainName=tonz.io SubDomain=libra HostedZoneId=Z0647044GG15YFJEKM CreateApex=no
aws s3 sync "./dist" "s3://libra-customresourcestack-tn8w1bls2f-s3bucketroot-5saolti5l3l2"
aws cloudfront create-invalidation --distribution-id="EROO7XKKI363S" --paths="/*"