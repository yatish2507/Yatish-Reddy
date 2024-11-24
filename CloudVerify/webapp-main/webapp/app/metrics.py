import boto3
import time
import statsd
from functools import wraps
from flask import request

cloudwatch_client = boto3.client('cloudwatch', region_name='us-east-1')
statsd_client = statsd.StatsClient('localhost', 8125)

def api_metrics(metric_name):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            response = func(*args, **kwargs)
            duration = (time.time() - start_time) * 1000

            cloudwatch_client.put_metric_data(
                Namespace='WebAppMetrics',
                MetricData=[
                    {'MetricName': f'{metric_name}_Count', 'Unit': 'Count', 'Value': 1},
                    {'MetricName': f'{metric_name}_Duration', 'Unit': 'Milliseconds', 'Value': duration}
                ]
            )
            
            statsd_client.incr(f'{metric_name}.count')
            statsd_client.timing(f'{metric_name}.duration', duration)
            
            return response
        return wrapper
    return decorator

def track_db_query(query_func):
    @wraps(query_func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = query_func(*args, **kwargs)
        duration = (time.time() - start_time) * 1000

        cloudwatch_client.put_metric_data(
            Namespace='WebAppMetrics',
            MetricData=[
                {'MetricName': 'DBQueryDuration', 'Unit': 'Milliseconds', 'Value': duration}
            ]
        )
        
        statsd_client.timing('db.query.duration', duration)
        
        return result
    return wrapper

def track_s3_operation(s3_func):
    @wraps(s3_func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = s3_func(*args, **kwargs)
        duration = (time.time() - start_time) * 1000 

        cloudwatch_client.put_metric_data(
            Namespace='WebAppMetrics',
            MetricData=[
                {'MetricName': 'S3OperationDuration', 'Unit': 'Milliseconds', 'Value': duration}
            ]
        )
        
        statsd_client.timing('s3.operation.duration', duration)
        
        return result
    return wrapper
