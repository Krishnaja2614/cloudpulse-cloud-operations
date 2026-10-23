# CloudPulse: Cloud Support Troubleshooting Guide

## 1. Website Unavailable

**Symptoms**

* The website does not load.
* The browser displays a connection error.

**Investigation**

1. Check whether the server is running.
2. Verify DNS resolution.
3. Check network connectivity and routing.
4. Check firewall rules and required ports.
5. Review web server logs.

**Possible causes**

* Server or web service failure.
* Incorrect DNS records.
* Network routing problems.
* Firewall restrictions.

## 2. HTTP 403 Forbidden

**Symptoms**

* The server responds with HTTP 403.

**Investigation**

1. Check file and directory permissions.
2. Review web server access rules.
3. Check application authorization.
4. Inspect relevant logs.

**Possible causes**

* Insufficient file permissions.
* Access restrictions.
* Incorrect authorization configuration.

## 3. HTTP 502 Bad Gateway

**Symptoms**

* A proxy or gateway returns HTTP 502.

**Investigation**

1. Check backend application health.
2. Verify the backend listening port.
3. Test connectivity between the proxy and backend.
4. Review firewall rules.
5. Inspect proxy and application logs.

**Possible causes**

* Backend application failure.
* Incorrect upstream configuration.
* Network connectivity problems.

## 4. High CPU Utilization

**Symptoms**

* CPU usage remains high.
* Application response times increase.

**Investigation**

1. Identify processes consuming CPU.
2. Review system metrics and recent changes.
3. Inspect application logs.
4. Check workload and resource capacity.
5. Determine whether the issue is temporary or persistent.

**Possible causes**

* Resource-intensive processes.
* Increased workload.
* Inefficient application behavior.
* Insufficient compute capacity.

## 5. DNS Resolution Failure

**Symptoms**

* A website fails when accessed by domain name.
* Access by IP address may still work.

**Investigation**

1. Use `nslookup` to inspect DNS resolution.
2. Verify the expected DNS record.
3. Check the returned IP address.
4. Consider DNS caching and recent record changes.

**Possible causes**

* Missing or incorrect DNS records.
* DNS server problems.
* Cached DNS information.

## Troubleshooting Principles

* Start with the observed symptoms.
* Gather evidence before making changes.
* Check the simplest likely causes first.
* Use logs and metrics to narrow down the problem.
* Make changes only when justified.
* Verify that the service has recovered.
* Document the root cause and preventive actions.

**Project scope:** These are simulated troubleshooting scenarios for learning. No real production incidents are represented.
