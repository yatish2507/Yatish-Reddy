[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/j48a217e)

## Final Project: Web Design and User Experience Engineering

This project is made for Web Design and User Experience Engineering "Final Project Assignment" given by the Prof. Amuthan Arulraj.

"Developing a web application that includes both web UI and a backend server. This project demonstrates our expertise with the technologies that we learned in and outside the lectures. The project provide solutions to one of the global issues identified by UN <https://www.un.org/en/global-issues>".

## Author

- Vivek S Patil - <shankarpatil.v@northeastern.edu>
- Sanjay B R - <bangalorerenukapra.s@northeastern.edu>
- Yatish J - <jayaramareddy.y@northeastern.edu>
- Sathwik G S - <gowdarashanthakuma.s@northeastern.edu>

# Project Title: ChildGuard

ChildGuard is a comprehensive web application designed to enhance child welfare through educational resources, health and nutrition guides, and safety reporting mechanisms. This platform connects donors and volunteers to support various initiatives focused on improving the lives of children globally. Whether you're looking to contribute financially, volunteer your time, or access valuable resources, ChildGuard provides a seamless interface to make a positive impact.

## Solutions Offered

- **Educational Resources**: A library of free, accessible educational content tailored to different age groups and learning levels.
- **Health and Nutrition Guide**: Information and resources on child health and nutrition.
- **Safety Reporting Mechanism**: A anonymous platform for reporting child safety concerns.

## Technology Stack

- **Frontend**: React.js, Redux for state management.
- **Backend**: Node.js, MongoDB for data persistence.

## Features

- **User Management**: Secure registration, login, and profile management for donors and volunteers.
- **Educational Resources**: Access to a curated library of educational materials.
- **Health and Nutrition Guide**: Comprehensive guides and articles on child health and nutrition.
- **Safety Reporting Mechanism**: An anonymous platform for reporting child safety concerns.
- **Donation Platform**: A secure system for making financial contributions to our cause.
- **Volunteer Opportunities**: A portal for finding and signing up for volunteer work supporting child welfare initiatives.

# Object Model

``` mermaid
---
Object Model for the project
---
classDiagram
    class User {
      +String userId
      +String username
      +String email
      +UserRole role
    }
    
    class EducationalResource {
      +String resourceId
      +String title
      +String content
      +String category
      +Date publishedDate
    }
    
    class HealthResource {
      +String resourceId
      +String title
      +String content
      +String category
      +Date publishedDate
    }
    
    class Project {
      +String projectId
      +String title
      +String description
      +String status
    }
    
    
    
    class VolunteerSignUp {
      +String signUpId
      +String userId
      +String opportunityId
      +Date signUpDate
      +String status
    }
    
   
    
    
    class Donation {
      +String donationId
      +String userId
      +double amount
      +String projectId
      +Date donationDate
    }

   
    class SafetyReport {
      +String reportId
      +String description
      +Date reportDate
      +ReportStatus status
    }
    
    class Admin {
      +String adminId
      +String username
    }
    
    %% Associations
    User "0..*" -- "1" EducationalResource : accesses
    User "0..*" -- "1" HealthResource : accesses
    User "1" -- "0..*" SafetyReport : submitsAnonymously
    Admin "1" -- "0..*" SafetyReport : manages
    
    %% Compositions
    User "1" -- "0..*" VolunteerSignUp : creates
    User "1" -- "0..*" Donation : makes
    
    %% Aggregations
    Project "1" -- "0..*" VolunteerSignUp : offers
    
     %% Aggregations
    Admin "1" -- "0..*" Donation : receives

    %% Enumerations
    class UserRole {
      <<enumeration>>
      User
      Admin
    }
    

```
