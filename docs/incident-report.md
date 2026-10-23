# Incident Report: Website Unavailable

## 1. Incident Summary

**Incident ID:** INC-001
**Severity:** High
**Status:** Resolved
**Environment:** Simulated cloud environment

A simulated website became unavailable. The objective was to identify the cause, verify connectivity, and document the recovery process.

## 2. Symptoms

* Users could not access the website.
* The service appeared unavailable.
* The cause was initially unknown.

## 3. Investigation Steps

1. Confirm the reported symptoms.
2. Check whether the website or service is running.
3. Verify the hostname and DNS resolution.
4. Check network connectivity and relevant ports.
5. Inspect service logs for errors.
6. Identify the likely cause before making changes.

## 4. Root Cause

**Training scenario:** The web server service was stopped.

This is a simulated root cause for learning purposes; no real cloud outage occurred.

## 5. Resolution

The service was restarted in the simulated scenario. The website was then checked again to verify that it was responding.

## 6. Verification

* Confirm that the service is running.
* Check that the website responds as expected.
* Review logs for recurring errors.
* Confirm that the incident can be marked resolved.

## 7. Prevention

* Monitor service availability.
* Review service logs regularly.
* Configure appropriate health checks and alerts.
* Document recovery procedures.

## 8. Lessons Learned

A structured troubleshooting process helps narrow down the cause of an outage before changes are made. Always verify recovery rather than assuming that restarting a service fixed the problem.

**Cost:** This is a documentation-only exercise. No AWS resources are required.
