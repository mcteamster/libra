---
name: abs-paygap-checker
description: Fetches latest gender pay gap statistics from ABS. Use when needing current Australian pay gap data for the libra app.
---

# ABS Gender Pay Gap Statistics Checker

This skill fetches the latest gender pay gap statistics from the Australian Bureau of Statistics for the libra bill-splitting application.

## Primary Sources

### 1. Average Weekly Earnings (AWE)
- URL: https://www.abs.gov.au/statistics/labour/earnings-and-working-conditions/average-weekly-earnings-australia/latest-release
- Published: Every 6 months (May and November)
- Released: ~3 months after reference period
- Key Metric: Mean weekly ordinary time earnings for full-time adults (commonly cited measure)

### 2. Gender Pay Gap Guide
- URL: https://www.abs.gov.au/statistics/understanding-statistics/guide-labour-statistics/gender-pay-gap-guide
- Provides context and explanation of different pay gap measures
- Links to AWE and other relevant statistics

## Usage

When checking for the latest pay gap data:
1. Search for the current percentage from the AWE latest release
2. Look for "gender pay gap" and "full-time adult" earnings
3. Verify the reference period (May or November year)
4. Check the release date to confirm it's the most recent data

## Current Value in App

The app currently uses 11.5% (0.115) based on May 2025 data.

## Update Frequency

- AWE releases: February (for November data) and August (for May data)
- Next expected release: February 26, 2026 (November 2025 data)
