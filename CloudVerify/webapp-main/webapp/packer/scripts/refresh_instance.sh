#!/bin/bash

# Fetch the latest launch template version
launchtemplateversion=$(aws ec2 describe-launch-templates --query 'sort_by(LaunchTemplates, &CreateTime)[-1].LatestVersionNumber' --output text)
if [ "$launchtemplateversion" == "None" ]; then
    echo "No launch template found"
    exit 1
fi

# Fetch the latest AMI ID
latestimageid=$(aws ec2 describe-images --executable-users self --query 'sort_by(Images, &CreationDate)[-1].ImageId' --output text)

# Fetch the name of the autoscaling group
autoscalegroupname=$(aws autoscaling describe-auto-scaling-groups --query 'sort_by(AutoScalingGroups, &CreatedTime)[-1].AutoScalingGroupName' --output text)

# Fetch the launch template ID
launchtemplateid=$(aws ec2 describe-launch-templates --query 'sort_by(LaunchTemplates, &CreateTime)[-1].LaunchTemplateId' --output text)

# Create a new launch template version with the latest AMI ID
aws ec2 create-launch-template-version --launch-template-id "$launchtemplateid" --source-version "$launchtemplateversion" --launch-template-data "{\"ImageId\":\"$latestimageid\"}"

# Get the current launch template version
curtemplateversion=$(aws ec2 describe-launch-templates --query 'sort_by(LaunchTemplates, &CreateTime)[-1].LatestVersionNumber' --output text)

# Update the autoscaling group with the new launch template version
aws autoscaling update-auto-scaling-group --auto-scaling-group-name "$autoscalegroupname" --launch-template "LaunchTemplateId=$launchtemplateid,Version=$curtemplateversion"

# Start instance refresh
refreshid=$(aws autoscaling start-instance-refresh --auto-scaling-group-name "$autoscalegroupname" --query "InstanceRefreshId" --output text)

# Monitor the instance refresh status
refreshstate="Pending"
while [ "$refreshstate" == "Pending" ] || [ "$refreshstate" == "InProgress" ]; do
    echo "Status:$refreshstate"
    sleep 10
    refreshstate=$(aws autoscaling describe-instance-refreshes --auto-scaling-group-name "$autoscalegroupname" --instance-refresh-ids "$refreshid" --query 'InstanceRefreshes[0].Status' --output text)
done

echo "Instance refresh was $refreshstate"

# Exit with an error if the refresh was not successful
if [ "$refreshstate" != "Successful" ]; then
    exit 1
fi